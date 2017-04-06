import React from "react";

const LockTeamsButton = ({canLock, onButtonClicked}) => (
    <div className="lock-team-button">
        <button onClick={onButtonClicked} disabled={!canLock}>Lock teams</button>
    </div>
);

LockTeamsButton.propTypes = {
    canLock: React.PropTypes.bool.isRequired,
    onButtonClicked: React.PropTypes.func.isRequired
};

export default LockTeamsButton;