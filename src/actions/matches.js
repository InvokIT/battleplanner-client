// @flow
import get from "lodash/fp/get";
import {push as pushLocation} from "react-router-redux";
import invokeCreateMatch from "../api/matches/create";
import invokeLoadMatches from "../api/matches";
import MatchLobbyApi from "../api/match-lobby";
import {loadUsers} from "./users";

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

export const createMatch = () => (dispatch : t_dispatch, getState) => {
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

const matchLobbies: Map<string, MatchLobbyApi> = new Map();

const matchLobbyConnectingAction = (matchId) => ({
    type: "match-lobby_connecting",
    matchId
});

const matchLobbyConnectedAction = (matchId) => ({
    type: "match-lobby_connected",
    matchId
});

const matchLobbyDisconnectedAction = (matchId) => ({
    type: "match-lobby_disconnected",
    matchId
});

const matchLobbyStateUpdateAction = (matchId, state) => ({
    type: "match-lobby_state-update",
    matchId,
    state
});

const matchLobbyPlayersUpdateAction = (matchId, players) => ({
    type: "match-lobby_players-update",
    matchId,
    players
});

export const connectToMatch = (matchId: string) => async (dispatch: t_dispatch) => {
    if (matchLobbies.has(matchId)) {
        console.warn(`Already connected to match ${matchId}`);
        return;
    }

    const matchLobby = new MatchLobbyApi({
        matchId,
        onMatchStateUpdate: (state) => dispatch(matchLobbyStateUpdateAction(matchId, state)),
        onPlayerListUpdate: (players) => {
            dispatch(matchLobbyPlayersUpdateAction(matchId, players));
            dispatch(loadUsers(...players));
        },
        onConnecting: () => dispatch(matchLobbyConnectingAction(matchId)),
        onConnected: () => dispatch(matchLobbyConnectedAction(matchId)),
        onClose: () => dispatch(matchLobbyDisconnectedAction(matchId))
    });

    await matchLobby.open();

    matchLobbies.set(matchId, matchLobby);
};

export const disconnectFromMatch = (matchId: string) => (dispatch: t_dispatch) => {
    const matchLobby = matchLobbies.get(matchId);

    if (!matchLobby) {
        console.warn(`Not connected to match ${matchId}`);
        return;
    }

    matchLobbies.delete(matchId);
    matchLobby.close();
};