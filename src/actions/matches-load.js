import { getMatches } from "../api";

const beginLoadMatches = () => ({
    type: "matches_load"
});

const finishLoadMatches = (err, matches) => ({
    type: "matches_loaded",
    matches,
    error: err
});

export default () => (dispatch) => {
    dispatch(beginLoadMatches());

    getMatches()
        .then(
            (matches) => dispatch(finishLoadMatches(null, matches)),
            (err) => dispatch(finishLoadMatches(err))
        );
};