import { push as pushLocationAction } from "react-router-redux";

export default class ControllerBase {
    pushLocation(dispatch, path) {
        dispatch(pushLocationAction(path));
    }
}