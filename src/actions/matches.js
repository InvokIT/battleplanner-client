import get from "lodash/fp/get";
import {push as pushLocation} from "react-router-redux";
import invokeCreateMatch from "../api/matches/create";
import invokeLoadMatches from "../api/matches";

const matchCreatingAction = () => ({
    type: "match_creating"
});

const matchCreatedAction = ({error, match}) => ({
    type: "match_created",
    match,
    error
});

const matchLoadedAction = ({match}) => ({
    type: "match_loaded",
    match
});

const matchesLoadedAction = ({error, matches}) => ({
    type: "matches_loaded",
    error,
    matches
});

const matchesLoadingAction = () => ({
    type: "matches_loading"
});

export const createMatchNameChange = (name) => ({
    type: "match-creator_name-change",
    name
});

export const createMatch = () => (dispatch, getState) => {
    dispatch(matchCreatingAction());

    const name = get("matchCreator.name", getState());

    return invokeCreateMatch({name})
        .then(
            match => {
                dispatch(matchCreatedAction({match}));
                dispatch(matchLoadedAction({match}));

                dispatch(pushLocation(`/matches/${match.id}`));
            },
            error => {
                dispatch(matchCreatedAction({error}));
            }
        );
};

export const loadMatches = () => (dispatch) => {
    dispatch(matchesLoadingAction());

    return invokeLoadMatches()
        .then(
            matches => {
                dispatch(matchesLoadedAction({matches}));
            },
            error => {
                dispatch(matchesLoadedAction({matches: []}));
            }
        );
};
