import { push as pushUrl } from "react-router-redux";
import jwtDecode from "jwt-decode";
import jwt from "../jwt";

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

export default (token) => (dispatch) => {
    jwt.set(token);

    dispatch({
        type: "auth_finish",
        user: parseUserFromJwt(token)
    });

    dispatch(pushUrl(token ? "/matches" : "/login"));
};