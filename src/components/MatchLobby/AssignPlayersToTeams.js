import React from "react";
import MatchRoundsContainer from "../MatchRoundsContainer";
import AssignableTeamContainer from "../AssignableTeamContainer";
import LockTeamsButtonContainer from "../LockTeamsButtonContainer"

const AssignPlayersToTeams = ({matchId, stateDescription}) => (
    <div className="app-content">
        <div className="match-lobby">
            {/*<div className="match-lobby__title">{title}</div>*/}
            <div className="match-lobby__components">
                <AssignableTeamContainer matchId={matchId} teamIndex={0}/>
                <div className="match-lobby_center-component">
                    <LockTeamsButtonContainer matchId={matchId}/>
                </div>
                <AssignableTeamContainer matchId={matchId} teamIndex={1}/>
            </div>
            <div className="match-lobby__state-description">
                {/*<span>{stateDescription}</span>*/}
                <span>Send the following link to your opponent:<br/><code>{window.location.href}</code></span>
            </div>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

AssignPlayersToTeams.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    stateDescription: React.PropTypes.string.isRequired
};

export default AssignPlayersToTeams;