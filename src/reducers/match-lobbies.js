import flow from "lodash/fp/flow";
import set from "lodash/fp/set";
import unset from "lodash/fp/unset";
import cloneDeep from "lodash/fp/cloneDeep";

const initialState = {};

const update = (...args) => flow(cloneDeep, ...args);

export default (state = initialState, action) => {
    const matchId = action.matchId;

    switch (action.type) {
        case "match-lobby_connecting":
            return update(
                set(`${matchId}.loading`, true)
            )(state);
        case "match-lobby_connected":
            return state;
        case "match-lobby_disconnected":
            return update(
                unset(matchId)
            )(state);
        case "match-lobby_state-update":
            return update(
                set(`${matchId}.state`, action.state),
                set(`${matchId}.loading`, false)
            )(state);
        case "match-lobby_players-update":
            return update(
                set(`${matchId}.players`, action.players)
            )(state);
        default:
            return state;
    }
};