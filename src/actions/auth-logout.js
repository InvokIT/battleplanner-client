import authFinish from "./auth-finish";

export default () => (dispatch) => {
    dispatch(authFinish(null));
};