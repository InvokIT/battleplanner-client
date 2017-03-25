import { connect } from 'react-redux';
import Login from "../Login";
import { authController } from "../../controllers";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: authController.loginWithSteam(dispatch)
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;