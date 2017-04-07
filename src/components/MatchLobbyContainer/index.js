import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import has from "lodash/fp/has";
import eq from "lodash/fp/eq";
import defaultTo from "lodash/fp/defaultTo";
import flatten from "lodash/fp/flatten";
import every from "lodash/fp/every";
import isNil from "lodash/fp/isNil";
import head from "lodash/fp/head";
import MatchLobby from "../MatchLobby";
import {
    connectToMatch,
    disconnectFromMatch,
} from "../../actions/match-lobby";
import {loadMatch} from "../../actions/matches"
import matchStateDescriptions from "../../text/match-state-descriptions";

const getMatchIdFromOwnProps = get("match.params.matchId");

const getLobby = (matchId) => get(`matchLobbies.${matchId}`);

// const getRounds = (matchId) => flow(
//     getLobby(matchId),
//     get("rounds"),
//     defaultTo([])
// );
//
// const getCurrentRound = (matchId) => (state) => {
//     const roundNum = flow(
//         getLobby(matchId),
//         get("currentRound"),
//         defaultTo(0)
//     )(state);
//
//     return getRounds(matchId)(state)[roundNum];
// };

// const getPlayers = (matchId) => (state) => {
//     const playerIds = flow(
//         getLobby(matchId),
//         get("players"),
//         defaultTo([])
//     )(state);
//
//     const users = flow(
//         get("users"),
//         at(playerIds),
//         filter(u => !isNil(u)),
//         sortBy(u => u.displayName)
//     )(state);
//
//     return users;
// };

// const getTeams = (matchId) => (state) => {
//     const teamPlayerIds = flow(
//         getLobby(matchId),
//         get("teams"),
//         defaultTo([[], []])
//     )(state);
//
//     const users = get("users")(state);
//
//     const teamUsers = map(team =>
//         flow(
//             at(team),
//             filter(u => !isNil(u))
//         )(users)
//     )(teamPlayerIds);
//
//     return teamUsers;
// };

const getLoading = (matchId) => (state) => {
    const lobbyLoaded = flow(
        getLobby(matchId),
        get("loading"),
        defaultTo(true),
        eq(false)
    );

    const matchLoaded = flow(
        has(`matches.${matchId}`)
    );

    const teamsLoaded = flow(
        getLobby(matchId),
        get("state.data.teams"),
        flatten,
        every(playerId => isNil(playerId) || has(`users.${playerId}`, state))
    );

    return !(lobbyLoaded(state) && matchLoaded(state) && teamsLoaded(state));
};

// const getStateDescription = (matchId) => flow(
//     getLobby(matchId),
//     get("state.name"),
//     getMatchStateDescription
// );

// const getCurrentMap = (matchId) => flow(
//     getCurrentRound(matchId),
//     get("map"),
//     (mapId) => find(m => m.id === mapId, maps),
//     defaultTo({image: null, name: ""})
// );

const getMatchStateName = (matchId) => flow(
    getLobby(matchId),
    get("state.name")
);

const getMatchStateDescription = (matchId) => (state) => {
    const currentTeam = flow(
        getLobby(matchId),
        get("state.data.currentTeam")
    )(state);

    const currentPlayerId = flow(
        getLobby(matchId),
        get(`state.data.teams[${currentTeam}]`),
        head
    )(state);

    const currentPlayer = get(`users.${currentPlayerId}`)(state);

    const currentStateName = getMatchStateName(matchId)(state);

    if (currentPlayer && currentStateName in matchStateDescriptions) {
        return matchStateDescriptions[currentStateName](currentPlayer);
    } else {
        return "";
    }
};

const mapStateToProps = (state, ownProps) => {
    const matchId = getMatchIdFromOwnProps(ownProps);

    return {
        loading: getLoading(matchId)(state),
        matchId: matchId,
        matchStateName: getMatchStateName(matchId)(state),
        matchStateDescription: getMatchStateDescription(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const matchId = getMatchIdFromOwnProps(ownProps);

    return {
        componentDidMount: () => {
            dispatch(connectToMatch(matchId));
            dispatch(loadMatch(matchId));
        },
        componentWillUnmount: () => dispatch(disconnectFromMatch(getMatchIdFromOwnProps(ownProps)))
    };
};

const MatchLobbyContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchLobby);

export default MatchLobbyContainer;