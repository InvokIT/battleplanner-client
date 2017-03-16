import { connect } from 'react-redux';
import App from "../App";
import authStages from "../../auth-stages";

const mapStateToProps = (state) => {
    const loggedIn = state.auth.stage === authStages.authorized;
    const user = state.auth.user;

    return {
        loggedIn: loggedIn,
        userDisplayName: loggedIn ? user.displayName : null,
        userAvatarUrl: loggedIn ? user.avatarUrl : null,
        userIsAdmin: loggedIn && !!user.isAdmin
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;