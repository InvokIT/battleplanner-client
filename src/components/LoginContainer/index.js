import { connect } from 'react-redux';
import Login from "../Login";
import { loginWithSteam } from "../../actions/auth";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: () => dispatch(loginWithSteam())
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;