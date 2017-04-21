import "./lock-team-button.css";

import React from "react";

const LockTeamsButton = ({hasLockRights = true, canLock, onButtonClicked}) => {
    if (!hasLockRights) {
        return null;
    }

    return (
        <div className="lock-team-button">
            <button onClick={onButtonClicked} disabled={!canLock}>Continue</button>
        </div>
    );
};

LockTeamsButton.propTypes = {
    canLock: React.PropTypes.bool.isRequired,
    hasLockRights: React.PropTypes.bool,
    onButtonClicked: React.PropTypes.func.isRequired
};

export default LockTeamsButton;