import React from "react";
import "./Login.css";

const Login = ({onLoginClick}) => {
    const devLogin = process.env.NODE_ENV === "development";

    return (
        <div className="login-component">
            {devLogin ? <button className="login-component__dev-button" onClick={e => onLoginClick("dev")}>Dev Login</button> : null}
            <button className="login-component__steam-button" onClick={e => onLoginClick("steam")}>
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