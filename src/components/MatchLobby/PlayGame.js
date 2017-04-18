import "./select-map-or-faction.css";

import React from "react";
import PlayerListButtonContainer from "../PlayerListButtonContainer";
import MatchRoundsContainer from "../MatchRoundsContainer";
import TeamContainer from "../TeamContainer";
import LobbyMapContainer from "../LobbyMapContainer";
import PlayGameContinueButtonContainer from "../PlayGameContinueButtonContainer";

const PlayGame = ({matchId, stateDescription}) => (
    <div className="app-content">
        <div className="match-lobby">
            <PlayerListButtonContainer matchId={matchId}/>
            {/*<div className="match-lobby__title">{title}</div>*/}
            <div className="match-lobby__components">
                <TeamContainer matchId={matchId} teamIndex={0}/>
                <div className="match-lobby_center-component">
                    <LobbyMapContainer matchId={matchId}/>
                </div>
                <TeamContainer matchId={matchId} teamIndex={1}/>
            </div>
            <div className="match-lobby__state-description">
                <div>Play the game!</div>
                <PlayGameContinueButtonContainer matchId={matchId} />
            </div>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

PlayGame.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    stateDescription: React.PropTypes.string.isRequired
};

export default PlayGame;