import "./lock-team-button.css";

import React from "react";

const LockTeamsButton = ({canLock, onButtonClicked}) => (
    <div className="lock-team-button">
        <button onClick={onButtonClicked} disabled={!canLock}>Continue</button>
    </div>
);

LockTeamsButton.propTypes = {
    canLock: React.PropTypes.bool.isRequired,
    onButtonClicked: React.PropTypes.func.isRequired
};

export default LockTeamsButton;