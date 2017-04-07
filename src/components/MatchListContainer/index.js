import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import values from "lodash/fp/values";
import forEach from "lodash/fp/forEach";
import sortBy from "lodash/fp/sortBy";
import {loadMatches} from "../../actions/matches";
import MatchList from "../MatchList";

const getMatches = flow(
    get("matches"),
    values,
    forEach(m => m.url = `/matches/${m.id}`),
    sortBy(m => m.created)
);

const mapStateToProps = (state) => {
    return {
        matches: getMatches(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        componentDidMount: () => dispatch(loadMatches())
    };
};

const MatchListContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchList);

export default MatchListContainer;