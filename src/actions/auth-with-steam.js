import authBegin from "../auth-begin";
import authFinish from "./auth-finish";

const authWithSteamWindow = () => {
    return new Promise((resolve, reject) => {
        const windowSrc = `${process.env.REACT_APP_API_HOST}/auth/steam`;
        const authWindow = window.open(windowSrc, "Steam Login", "centerscreen,width=1000,height=750,resizable,scrollbars,status");

        let authResponseReceived = false;

        authWindow.on("close", (e) => {
            if (!authResponseReceived) {
                reject(new Error("User closed the login dialog."));
            }
        });

        const onMessage = (event) => {
            const origin = event.origin || event.originalEvent.origin;
            if (origin === process.env.REACT_APP_API_HOST) {
                const msg = event.data;
                if (msg.type === "auth-response") {
                    authResponseReceived = true;
                    window.removeEventListener("message", onMessage, false);
                    authWindow.close();

                    const token = msg.value;

                    resolve(token);
                }
            } else {
                throw new Error("Received message from unauthorized origin '" + origin + "', expected " + process.env.REACT_APP_API_HOST);
            }
        };

        window.addEventListener("message", onMessage, false);
    });
};

export default () => (dispatch) => {
    dispatch(authBegin());

    return authWithSteamWindow()
        .then(token => dispatch(authFinish(token)));
};