import "./select-map-or-faction.css";

import React from "react";
import PlayerListButtonContainer from "../PlayerListButtonContainer";
import MatchRoundsContainer from "../MatchRoundsContainer";
import MatchOverContainer from "../MatchOverContainer";

const GameOver = ({matchId, stateDescription}) => (
    <div className="app-content">
        <div className="match-lobby">
            <PlayerListButtonContainer matchId={matchId}/>
            {/*<div className="match-lobby__title">{title}</div>*/}
            <div className="match-lobby__components">
                <MatchOverContainer matchId={matchId} />
            </div>
            <div className="match-lobby__state-description"><span>{stateDescription}</span></div>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

GameOver.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    stateDescription: React.PropTypes.string.isRequired
};

export default GameOver;