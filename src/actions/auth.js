import { push as pushLocation } from "react-router-redux";
import jwtDecode from "jwt-decode";
import jwtStore from "../jwt-store";
import invokeAuthValidate from "../api/auth/validate";

const parseUserFromJwt = (jwt) => {
    if (!jwt) {
        return null;
    }

    jwt = jwtDecode(jwt);
    return {
        id: jwt.sub,
        avatarUrl: jwt.avatarUrl,
        displayName: jwt.displayName,
        steamId: jwt.steamId,
        roles: jwt.roles || []
    };
};

const onAuthBegin = (dispatch) => {
    dispatch({type: "auth_begin"});
};

const onAuthSuccess = (dispatch, jwt) => {
    jwtStore.set(jwt);

    dispatch({
        type: "auth_finish",
        user: parseUserFromJwt(jwt)
    });

    dispatch(pushLocation("/matches"));
};

const onAuthFail = (dispatch) => {
    jwtStore.set(null);

    dispatch({
        type: "auth_finish",
        user: null
    });

    dispatch(pushLocation("/login"));
};


export const loginWithSteam = () => (dispatch) => {
    const apiOrigin = process.env.REACT_APP_API_ORIGIN;

    onAuthBegin(dispatch);

    const windowSrc = `${apiOrigin}/auth/steam`;
    const authWindow = window.open(windowSrc, "Steam Login", "centerscreen,width=1000,height=750,resizable,scrollbars,status");

    const onMessage = (event) => {
        const origin = event.origin || event.originalEvent.origin;
        const originRegexp = new RegExp(`^\\w+:${apiOrigin}`);

        if (originRegexp.test(origin)) {
            const msg = event.data;
            if (msg.type === "auth-response") {
                window.removeEventListener("message", onMessage, false);
                authWindow.close();
                onAuthSuccess(dispatch, msg.value);
            }
        } else {
            onAuthFail(dispatch);
            //TODO log
            throw new Error("Received message from unauthorized origin: " + origin);
        }
    };

    window.addEventListener("message", onMessage, false);
};

export const validate = () => (dispatch) => {
    onAuthBegin(dispatch);

    const token = jwtStore.get();

    if (!token) {
        onAuthFail(dispatch);
        return Promise.resolve();
    }

    return invokeAuthValidate()
        .then(() => onAuthSuccess(dispatch, token))
        .catch(() => onAuthFail(dispatch));
};

export const logout = () => (dispatch) => {
    onAuthBegin(dispatch);

    jwtStore.set(null);

    onAuthFail(dispatch);
};