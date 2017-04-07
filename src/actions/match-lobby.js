// @flow
import MatchLobbyApi from "../api/match-lobby";
import {loadUsers} from "./users";

type t_dispatch = (any) => void;

const matchLobbies: Map<string, MatchLobbyApi> = new Map();

const withLobby = (matchId: string, fn: (MatchLobbyApi) => void) => {
    const matchLobby = matchLobbies.get(matchId);

    if (!matchLobby) {
        console.warn(`Not connected to match ${matchId}`);
        return;
    }

    fn(matchLobby);
};

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
    withLobby(matchId, (matchLobby) => {
        matchLobbies.delete(matchId);
        matchLobby.close();
    });
};

export const assignPlayerToTeam = (matchId: string, playerId: string, team: number, teamSlot: number) => (dispatch: t_dispatch) => {
    withLobby(matchId, matchLobby => {
        matchLobby.assignPlayerToTeam(playerId, team, teamSlot);
    });
};

export const lockTeams = (matchId: string) => (dispatch: t_dispatch) => {
    withLobby(matchId, matchLobby => {
        matchLobby.lockTeams();
    });

};

export const continueAction = (matchId: string) => (dispatch: t_dispatch) => {
    withLobby(matchId, (matchLobby) => {
        matchLobby.continue();
    });
};

export const flipCoinAnimationStartAction = (matchId: string) => ({
    type: "flip-coin-animation-start",
    matchId: matchId
});

export const flipCoinAnimationEndAction = (matchId: string) => ({
    type: "flip-coin-animation-end",
    matchId: matchId
});

export const flipCoinAction = (matchId: string) => (dispatch: t_dispatch) => {
    withLobby(matchId, (matchLobby) => {
        matchLobby.flipCoin();
        dispatch(flipCoinAnimationStartAction(matchId));
    });
};
