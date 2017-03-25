import { connect } from 'react-redux';
import LogoutButton from "../LogoutButton";
import { authController } from "../../controllers";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: authController.logout(dispatch)
    };
};

const LogoutButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LogoutButton);

export default LogoutButtonContainer;