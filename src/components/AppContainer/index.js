import { connect } from 'react-redux';
import App from "../App";
import authStages from "../../auth-stages";

const mapStateToProps = (state) => {
    const loggedIn = state.auth.stage === authStages.authorized;
    const user = state.auth.user;

    return {
        user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;