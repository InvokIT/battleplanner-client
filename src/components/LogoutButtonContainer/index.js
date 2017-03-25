import { connect } from 'react-redux';
import LogoutButton from "../LogoutButton";
import { logout } from "../../actions/auth";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    };
};

const LogoutButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

export default LogoutButtonContainer;