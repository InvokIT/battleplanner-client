import jwt from "../jwt";
import authFinish from "./auth-finish";

export default () => (dispatch) => {
    dispatch({type: "auth_begin"});
    const token = jwt.get();

    if (!token) {
        dispatch(authFinish(null));
    }

    return fetch(`${process.env.REACT_APP_API_HOST}/auth/validate`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => {
        if (response.ok) {
            dispatch(authFinish(token));
        } else {
            dispatch(authFinish(null));
        }
    });
};