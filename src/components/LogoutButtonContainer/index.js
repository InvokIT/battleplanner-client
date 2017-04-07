import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import eq from "lodash/fp/eq";
import LogoutButton from "../LogoutButton";
import { logout } from "../../actions/auth";
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
        onLogout: () => dispatch(logout())
    };
};

const LogoutButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

export default LogoutButtonContainer;