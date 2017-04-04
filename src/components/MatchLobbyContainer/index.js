import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import defaultTo from "lodash/fp/defaultTo";
import sortBy from "lodash/fp/sortBy";
import at from "lodash/fp/at";
import filter from "lodash/fp/filter";
import isNil from "lodash/fp/isNil";
import map from "lodash/fp/map";
import find from "lodash/fp/find";
import MatchLobby from "../MatchLobby";
import {connectToMatch, disconnectFromMatch} from "../../actions/matches";
import {getMatchStateDescription} from "../../text";
import {loadMatch} from "../../actions/matches"
import {maps} from "../../config";

const getMatchIdFromOwnProps = get("match.params.matchId");

const getLobby = (matchId) => get(`matchLobbies.${matchId}`);

const getRounds = (matchId) => flow(
    getLobby(matchId),
    get("rounds"),
    defaultTo([])
);

const getCurrentRound = (matchId) => (state) => {
    const roundNum = flow(
        getLobby(matchId),
        get("currentRound"),
        defaultTo(0)
    )(state);

    return getRounds(matchId)(state)[roundNum];
};

const getPlayers = (matchId) => (state) => {
    const playerIds = flow(
        getLobby(matchId),
        get("players"),
        defaultTo([])
    )(state);

    const users = flow(
        get("users"),
        at(playerIds),
        filter(u => !isNil(u)),
        sortBy(u => u.displayName)
    )(state);

    return users;
};

const getTeams = (matchId) => (state) => {
    const teamPlayerIds = flow(
        getLobby(matchId),
        get("teams"),
        defaultTo([[], []])
    )(state);

    const users = get("users")(state);

    const teamUsers = map(team =>
        flow(
            at(team),
            filter(u => !isNil(u))
        )(users)
    )(teamPlayerIds);

    return teamUsers;
};

const getLoading = (matchId) => flow(
    getLobby(matchId),
    get("loading"),
    defaultTo(true)
);

const getStateDescription = (matchId) => flow(
    getLobby(matchId),
    get("state.name"),
    getMatchStateDescription
);

const getTitle = (matchId) => get(`matches.${matchId}.name`);

const getCurrentMap = (matchId) => flow(
    getCurrentRound(matchId),
    get("map"),
    (mapId) => find(m => m.id === mapId, maps),
    defaultTo({image: null, name:""})
);

const mapStateToProps = (state, ownProps) => {
    const matchId = getMatchIdFromOwnProps(ownProps);
    const isLoading = getLoading(matchId)(state);

    return {
        loading: isLoading,
        title: getTitle(matchId)(state),
        matchState: isLoading ? null : {
            description: getStateDescription(matchId)(state),
            map: getCurrentMap(matchId)(state),
            rounds: getRounds(matchId)(state),
            players: getPlayers(matchId)(state),
            teams: getTeams(matchId)(state)
        }
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            componentDidMount: () => {
                const matchId = getMatchIdFromOwnProps(ownProps);
                dispatch(connectToMatch(matchId));
                dispatch(loadMatch(matchId));
            },
            componentWillUnmount: () => dispatch(disconnectFromMatch(getMatchIdFromOwnProps(ownProps)))
        };
    }
;

const MatchLobbyContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchLobby);

export default MatchLobbyContainer;