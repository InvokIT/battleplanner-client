import "./post-results.css";

import React from "react";
import noop from "lodash/fp/noop";
import {playerShape} from "../shapes";

const LobbyMap = ({victoryPoints, players, selectedPlayer, onWinnerSelected, onVictoryPointsChange, onContinueClick}) => {
    const classNames = ["lobby-map"];

    if (canSelectMap) {
        classNames.push("can-select-map")
    }

    return (
        <div className={classNames.join(" ")}>
            <PostResults scenario={scenario}/>
            <div className="lobby-map__click-area" onClick={onSelectMapClick}>
                <div className="lobby-map__click-text click-me-text"><span>Click to select map</span></div>
            </div>
            <div className="lobby-map__title"><span>Map</span></div>
        </div>
    );
};

LobbyMap.propTypes = {
    victoryPoints: React.PropTypes.number.isRequired,
    players: React.PropTypes.arrayOf(playerShape).isRequired,
    selectedPlayer: playerShape,
    onWinnerSelected: React.Component.func.isRequired,
    onVictoryPointsChange: React.PropTypes.func.isRequired,
    onContinueClick: React.PropTypes.func.isRequired
};


export default LobbyMap;