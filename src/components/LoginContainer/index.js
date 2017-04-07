import { connect } from 'react-redux';
import get from "lodash/fp/get";
import Login from "../Login";
import { loginWithSteam } from "../../actions/auth";

const mapStateToProps = (state, {match}) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLoginClick: () => dispatch(loginWithSteam(get("location.state.from", ownProps)))
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;