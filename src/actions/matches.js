// @flow
import get from "lodash/fp/get";
import {push as pushLocation} from "react-router-redux";
import invokeCreateMatch from "../api/matches/create";
import invokeLoadMatches from "../api/matches";

type t_dispatch = (any) => void;

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

export const createMatchRoundCountChange = (roundCount) => ({
    type: "match-creator_round-count-change",
    roundCount
});

export const createMatch = () => (dispatch : t_dispatch, getState) => {
    dispatch(matchCreatingAction());

    const matchCreatorArgs = get("matchCreator", getState());

    return invokeCreateMatch(matchCreatorArgs)
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

export const loadMatches = () => (dispatch : t_dispatch) => {
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

export const loadMatch = (matchId: string) => async (dispatch: t_dispatch) => {
    const match = await invokeLoadMatches(matchId);
    dispatch(matchLoadedAction({match}));
};

export const togglePlayerList = (visible: ?boolean) => ({
    type: "player-list-button_toggle-list",
    visible: visible
});