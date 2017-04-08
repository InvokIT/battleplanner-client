import "./select-map-or-faction.css";

import React from "react";
import MatchRoundsContainer from "../MatchRoundsContainer";
import TeamContainer from "../TeamContainer";
import PostResultsContainer from "../PostResultsContainer";

const PlayGame = ({matchId, stateDescription}) => (
    <div className="app-content">
        <div className="match-lobby">
            {/*<div className="match-lobby__title">{title}</div>*/}
            <div className="match-lobby__components">
                <TeamContainer matchId={matchId} teamIndex={0}/>
                <div className="match-lobby_center-component">
                    <PostResultsContainer matchId={matchId} />
                </div>
                <TeamContainer matchId={matchId} teamIndex={1}/>
            </div>
            <div className="match-lobby__state-description"><span>{stateDescription}</span></div>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

PlayGame.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    stateDescription: React.PropTypes.string.isRequired
};


export default PlayGame;