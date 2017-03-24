import { connect } from 'react-redux';
import LogoutButton from "../LogoutButton";
import { logout } from "../../controllers/auth";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: logout(dispatch)
    };
};

const LogoutButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

export default LogoutButtonContainer;