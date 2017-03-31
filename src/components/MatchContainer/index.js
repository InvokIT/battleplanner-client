import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import defaultTo from "lodash/fp/defaultTo";
import sortBy from "lodash/fp/sortBy";
import Match from "../Match";

const getMatchIdFromOwnProps = get("match.params.matchId");

const getCurrentRound = (match) => {
    const roundNum = match.currentRound || 0;
    return getRounds(match)[roundNum];
};

const getRounds = flow(
    get("rounds"),
    defaultTo([])
);

const getPlayers = flow(
    get("players"),
    defaultTo([]),
    sortBy(p => p.displayName)
);

const getTeams = flow(
    get("teams"),
    defaultTo(new Array(2))
);

const getLoading = flow(
    get("loading"),
    defaultTo(true)
);

const mapStateToProps = (state, ownProps) => {
    const matchId = getMatchIdFromOwnProps(ownProps);
    const match = state.matches[matchId];

    return {
        loading: getLoading(match),
        currentRound: getCurrentRound(match),
        rounds: getRounds(match),
        players: getPlayers(match),
        teams: getTeams(match)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // componentDidMount: () => dispatch(connectToMatch(getMatchIdFromOwnProps(ownProps)))
    };
};

const MatchContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(Match);

export default MatchContainer;