import React from "react";
import {playerAndFactionShape} from "../shapes";
import PlayerWithFaction from "../PlayerWithFaction";

const Team = ({teamIndex, team}) => (
    <div className={`team team_${teamIndex}`}>
        {team.map((playerAndFaction, slotIndex) => (
            <div key={slotIndex} className="team__slot">
                <PlayerWithFaction player={playerAndFaction.player} faction={playerAndFaction.faction}/>
            </div>
        ))}
    </div>
);

Team.propTypes = {
    teamIndex: React.PropTypes.number.isRequired,
    team: React.PropTypes.arrayOf(playerAndFactionShape).isRequired
};

export default Team;