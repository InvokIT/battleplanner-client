import authBegin from "../actions/auth-begin";
import authFinish from "../actions/auth-finish";

export const loginWithSteam = (dispatch) => {
    return (e) => {
        const windowSrc = `${process.env.REACT_APP_API_HOST}/auth/steam`;
        const authWindow = window.open(windowSrc, "Steam Login", "centerscreen,width=1000,height=750,resizable,scrollbars,status");

        const onMessage = (event) => {
            const origin = event.origin || event.originalEvent.origin;
            if (origin === process.env.REACT_APP_API_HOST) {
                const msg = event.data;
                if (msg.type === "auth-response") {
                    window.removeEventListener("message", onMessage, false);
                    authWindow.close();
                    dispatch(authFinish(msg.value));
                }
            } else {
                throw new Error("Received message from unauthorized origin: " + origin);
            }
        };

        window.addEventListener("message", onMessage, false);

        dispatch(authBegin());
    };
};
