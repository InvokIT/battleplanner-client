import jwt from "../jwt";
import authFinish from "./auth-finish";

export default () => (dispatch) => {
    const onAuthFinish = (token) => {
        dispatch(authFinish(token));
    };

    dispatch({type: "auth_begin"});
    const token = jwt.get();

    if (!token) {
        onAuthFinish(null);
    }

    return fetch(`${process.env.REACT_APP_API_HOST}/auth/validate`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => onAuthFinish(response.ok ? token : null));
};