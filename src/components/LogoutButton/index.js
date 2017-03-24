import React from "react";
import "./LogoutButton.css"

const LogoutButton = ({onLogout}) => {
    return (
        <div className="logout-button">
            <button onClick={onLogout}>Log out</button>
        </div>
    );
};

LogoutButton.propTypes = {
    onLogout: React.PropTypes.func.isRequired
};

export default LogoutButton;
