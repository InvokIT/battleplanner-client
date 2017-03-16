import React from "react";
import "./Login.css";

const Login = ({onLoginClick}) => {
    return (
        <div className="login-component">
            <button className="login-component__steam-button" onClick={onLoginClick}>
                <div>Sign in through</div>
                <img src="./gfx/steam_logo.png" alt="Steam" />
                <aside>This site is not associated with Valve Corp.</aside>
            </button>
        </div>
    );
};

Login.propTypes = {
    onLoginClick: React.PropTypes.func.isRequired,
};

export default Login;