import React from "react";
import { validate as validateAuth } from "./controllers/auth";

const LoginValidator = ({authorized, loginComponent, children}) => (
    <div>
        {authorized ? {loginComponent} : {children}}
    </div>
);

LoginValidator.propTypes = {
    authorized: React.PropTypes.bool.isRequired,
    loginComponent: React.PropTypes.objectOf(React.Component),
    children: React.PropTypes.oneOf([
        React.PropTypes.objectOf(React.Component),
        React.PropTypes.arrayOf(React.Component)
    ])
};

export default LoginValidator;