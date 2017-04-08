import React from "react";

const PlayGameContinueButton = ({canContinue, onButtonClicked}) => (
    <div className="play-game-continue-button">
        <button onClick={onButtonClicked} disabled={!canContinue}>Continue</button>
    </div>
);

PlayGameContinueButton.propTypes = {
    canContinue: React.PropTypes.bool.isRequired,
    onButtonClicked: React.PropTypes.func.isRequired
};

export default PlayGameContinueButton;