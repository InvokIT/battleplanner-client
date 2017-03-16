import jwtDecode from "jwt-decode";
import jwt from "../jwt";

const parseUserFromJwt = (jwt) => {
    jwt = jwtDecode(jwt);

    return {
        id: jwt.sub,
        avatarUrl: jwt.avatarUrl,
        displayName: jwt.displayName,
        steamId: jwt.steamId,
        steamIdentifier: jwt.steamIdentifier
    };
};

export default (token) => {
    jwt.set(token);

    return {
        type: "auth_finish",
        user: parseUserFromJwt(token)
    };
};