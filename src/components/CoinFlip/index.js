import "./coin-flip.css";

import React from "react";

const CoinFlip = ({faces, onFlipCoinButtonClick, result}) => (
    <div className="coin-flip">
        <div className={`coin coin__result-${result}`}>
            {faces.map((face, i) => (
                <div key={i} className={`coin-face coin-face_${i}`}>
                    <div className="coin-face__image" style={{backgroundImage:`url(${face.image})`}} />
                    <span className="coin-face__name">{face.name}</span>
                </div>
            ))}
        </div>
        <button onClick={onFlipCoinButtonClick}>Spin the coin!</button>
    </div>
);

CoinFlip.propTypes = {
    faces: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        image: React.PropTypes.string.isRequired
    })),
    onFlipCoinButtonClick: React.PropTypes.func.isRequired,
    result: React.PropTypes.number
};

export default CoinFlip;