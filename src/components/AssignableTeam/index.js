import "./assignable-team.css";

import React from "react";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import defaultTo from "lodash/fp/defaultTo";
import {playerShape} from "../shapes";
import PlayerWithFaction from "../PlayerWithFaction";
import PlayerSelector from "../PlayerSelector";

const getSelectedPlayerId = flow(
    get("id"),
    defaultTo("")
);

const AssignableTeam = ({teamIndex, team, players, onPlayerSelected}) => (
    <div className={`team team_${teamIndex} team-assignable`}>
        {team.map((selectedPlayer, slotIndex) => (
            <div key={slotIndex} className="team__slot">
{/*
                <select className="player-selector" value={getSelectedPlayerId(selectedPlayer)} onChange={(e) => onPlayerSelected(slotIndex, e.target.value)}>
                    <option value={""}>Assign player...</option>
                    {players.map((player, i) => (
                        <option key={i} value={player.id}>{player.displayName}</option>
                    ))}
                </select>
*/}
                <PlayerSelector players={players} onPlayerSelect={player => onPlayerSelected(slotIndex, player.id)}/>
                <PlayerWithFaction player={selectedPlayer} />
            </div>
        ))}
    </div>
);

AssignableTeam.propTypes = {
    teamIndex: React.PropTypes.number.isRequired,
    team: React.PropTypes.arrayOf(playerShape).isRequired,
    players: React.PropTypes.arrayOf(playerShape).isRequired,
    onPlayerSelected: React.PropTypes.func.isRequired
};

export default AssignableTeam;