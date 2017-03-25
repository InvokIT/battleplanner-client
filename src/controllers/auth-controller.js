import authBeginAction from "../actions/auth-begin";
import authFinishAction from "../actions/auth-finish";
import jwtDecode from "jwt-decode";
import jwtStore from "../jwt-store";
import invokeAuthValidate from "../api/auth/validate";
import ControllerBase from "./controller-base";

const apiOrigin = process.env.REACT_APP_API_ORIGIN;

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


export default class AuthController extends ControllerBase {
    loginWithSteam(dispatch) {
        return () => {
            this.onAuthBegin(dispatch);

            const windowSrc = `${apiOrigin}/auth/steam`;
            const authWindow = window.open(windowSrc, "Steam Login", "centerscreen,width=1000,height=750,resizable,scrollbars,status");

            const onMessage = (event) => {
                const origin = event.origin || event.originalEvent.origin;
                if (origin === apiOrigin) {
                    const msg = event.data;
                    if (msg.type === "auth-response") {
                        window.removeEventListener("message", onMessage, false);
                        authWindow.close();
                        this.onAuthSuccess(dispatch, msg.value);
                    }
                } else {
                    this.onAuthFail(dispatch);
                    //TODO log
                    throw new Error("Received message from unauthorized origin: " + origin);
                }
            };

            window.addEventListener("message", onMessage, false);
        };
    }

    validate(dispatch) {
        return () => {
            this.onAuthBegin(dispatch);

            const token = jwtStore.get();

            if (!token) {
                this.onAuthFail(dispatch);
                return Promise.resolve();
            }

            return invokeAuthValidate()
                .then(this.onAuthSuccess(dispatch, token))
                .catch(this.onAuthFail(dispatch));
        };
    }

    logout(dispatch) {
        return () => {
            this.onAuthBegin(dispatch);

            jwtStore.set(null);

            this.onAuthFail(dispatch);
        };
    }

    onAuthBegin(dispatch) {
        dispatch(authBeginAction());
    }

    onAuthSuccess(dispatch, jwt) {
        jwtStore.set(jwt);
        dispatch(authFinishAction(parseUserFromJwt(jwt)));
        this.pushLocation(dispatch, "/matches");
    }

    onAuthFail(dispatch) {
        jwtStore.set(null);
        dispatch(authFinishAction({user: null}));
        this.pushLocation(dispatch, "/login");
    }

}