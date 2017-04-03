import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import defaultTo from "lodash/fp/defaultTo";
import sortBy from "lodash/fp/sortBy";
import at from "lodash/fp/at";
import filter from "lodash/fp/filter";
import isNil from "lodash/fp/isNil";
import map from "lodash/fp/map";
import MatchLobby from "../MatchLobby";
import {connectToMatch, disconnectFromMatch} from "../../actions/matches";

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
    );

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

const mapStateToProps = (state, ownProps) => {
    const matchId = getMatchIdFromOwnProps(ownProps);

    return {
        loading: getLoading(matchId)(state),
        currentRound: getCurrentRound(matchId)(state),
        rounds: getRounds(matchId)(state),
        players: getPlayers(matchId)(state),
        teams: getTeams(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        componentDidMount: () => dispatch(connectToMatch(getMatchIdFromOwnProps(ownProps))),
        componentWillUnmount: () => dispatch(disconnectFromMatch(getMatchIdFromOwnProps(ownProps)))
    };
};

const MatchLobbyContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchLobby);

export default MatchLobbyContainer;