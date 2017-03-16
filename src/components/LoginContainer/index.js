import { connect } from 'react-redux';
import Login from "../Login";
import { loginWithSteam } from "../../controllers/login";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: loginWithSteam(dispatch)
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;