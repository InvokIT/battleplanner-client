import React from "react";
import "./LogoutButton.css"

const LogoutButton = ({isAuthenticated, onLogout}) => {
    if (!isAuthenticated) {
        return null;
    }

    return (
        <button className="logout-button" onClick={onLogout}>Log out</button>
    );
};

LogoutButton.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    onLogout: React.PropTypes.func.isRequired
};

export default LogoutButton;
