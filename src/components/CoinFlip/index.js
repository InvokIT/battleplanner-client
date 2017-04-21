import "./coin-flip.css";

import React from "react";
import defaultAvatar from "../../gfx/default-avatar.png";

const filterAnimationEvents = (handler) => (event) => {
    switch (event.animationName) {
        case "spin-coin-animation-0":
        case "spin-coin-animation-1":
            handler(event);
            break;
        default:
    }
};

const CoinFlip = ({faces, canFlipCoin, canContinue, onFlipCoinButtonClick, onFlipCoinAnimationEnd, onContinueButtonClick, winnerFaceIndex}) => (
    <div className="coin-flip">
        <div className={`coin coin__result-${winnerFaceIndex}`}
             onAnimationEnd={filterAnimationEvents(onFlipCoinAnimationEnd)}>
            {faces.map((face, i) => {
                const faceImage = face.image || defaultAvatar;
                return (
                    <div key={i} className={`coin-face coin-face_${i}`}>
                        <div className="coin-face__image" style={{backgroundImage: `url(${faceImage})`}}/>
                        <span className="coin-face__name">{face.name}</span>
                    </div>
                );
            })}
        </div>
        <div className="button-group vertical">
            {canFlipCoin ? <button className="coin-flip__flip-button" onClick={onFlipCoinButtonClick}>Spin</button> : null}
            {canContinue ? <button className="coin-flip__continue-button" onClick={onContinueButtonClick}>Continue</button> : null}
        </div>
    </div>
);

CoinFlip.propTypes = {
    faces: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        image: React.PropTypes.string
    })),
    canFlipCoin: React.PropTypes.bool.isRequired,
    canContinue: React.PropTypes.bool.isRequired,
    onFlipCoinButtonClick: React.PropTypes.func.isRequired,
    onFlipCoinAnimationEnd: React.PropTypes.func.isRequired,
    onContinueButtonClick: React.PropTypes.func.isRequired,
    winnerFaceIndex: React.PropTypes.number
};

export default CoinFlip;