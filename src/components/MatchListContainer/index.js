import { connectWithLifecycle } from "react-lifecycle-component";
import { loadMatches } from "../../controllers/matches";
import MatchList from "../MatchList";

const mapStateToProps = (state) => {
    return {
        matches: state.matches
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        componentDidMount: () => loadMatches(dispatch)
    };
};

const MatchListContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(MatchList);

export default MatchListContainer;