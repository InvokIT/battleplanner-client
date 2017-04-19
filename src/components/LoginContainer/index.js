// @flow

import { connect } from 'react-redux';
import get from "lodash/fp/get";
import Login from "../Login";
import { login } from "../../actions/auth";

const mapStateToProps = (state, {match}) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLoginClick: (provider: string) => dispatch(login(provider, get("location.state.from", ownProps)))
    };
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;