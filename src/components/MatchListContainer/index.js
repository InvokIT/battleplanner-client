import {connectWithLifecycle} from "react-lifecycle-component";
import flow from "lodash/fp/flow";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";
import {loadMatches} from "../../actions/matches";
import MatchList from "../MatchList";

const mapStateToProps = (state) => {
    return {
        matches: flow(values, sortBy(m => m.created))(state.matches)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        componentDidMount: () => dispatch(loadMatches())
    };
};

const MatchListContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchList);

export default MatchListContainer;