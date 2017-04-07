import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import eq from "lodash/fp/eq";
import MatchBrowser from "../MatchBrowser";
import authStages from "../../auth-stages";

const isAuthenticated = flow(
    get("auth.stage"),
    eq(authStages.authorized)
);

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const MatchBrowserContainer = connect(mapStateToProps, mapDispatchToProps)(MatchBrowser);

MatchBrowserContainer.propTypes = {
};

export default MatchBrowserContainer;