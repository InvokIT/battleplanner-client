import React from "react";

const PlayGameContinueButton = ({canContinue, onButtonClicked}) => {
    if (!canContinue) {
        return null;
    }

    return (
        <div className="play-game-continue-button">
            <button onClick={onButtonClicked}>Continue</button>
        </div>
    );
};

PlayGameContinueButton.propTypes = {
    canContinue: React.PropTypes.bool.isRequired,
    onButtonClicked: React.PropTypes.func.isRequired
};

export default PlayGameContinueButton;