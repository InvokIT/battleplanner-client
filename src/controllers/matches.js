import createMatchAction from "../actions/match-create";
import loadMatchesAction from "../actions/matches-load";

export const createMatch = (dispatch) => () => {
    dispatch(createMatchAction());
};

export const loadMatches = (dispatch) => () => {
    dispatch(loadMatchesAction());
};