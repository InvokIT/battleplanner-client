import { createMatch } from "../api";

const createMatchAction = () => ({
    type: "match_create"
});

const createdMatchAction = (err, match) => ({
    type: "match_created",
    match,
    error: err
});

export default () => (dispatch) => {
    dispatch(createMatchAction());

    createMatch()
        .then(
            (match) => dispatch(createdMatchAction(null, match)),
            (err) => dispatch(createdMatchAction(err))
        );
};