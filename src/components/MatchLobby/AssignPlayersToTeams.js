import React from "react";
import MatchRoundsContainer from "../MatchRoundsContainer";
import AssignableTeamContainer from "../AssignableTeamContainer";
import LockTeamsButtonContainer from "../LockTeamsButtonContainer"

const AssignPlayersToTeams = ({matchId}) => (
    <div className="app-content">
        <div className="match-lobby">
            {/*<div className="match-lobby__title">{title}</div>*/}
            {/*<div className="match-lobby__state-description">{description}</div>*/}
            <AssignableTeamContainer matchId={matchId} teamIndex={0}/>
            <LockTeamsButtonContainer matchId={matchId}/>
            <AssignableTeamContainer matchId={matchId} teamIndex={1}/>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

AssignPlayersToTeams.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default AssignPlayersToTeams;