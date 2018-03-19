// @flow
import "./team.css";

import React from "react";
import noop from "lodash/fp/noop";
import includes from "lodash/fp/includes";
import {playerAndFactionShape} from "../shapes";
import PlayerWithFaction from "../PlayerWithFaction";
import StartingPositions from "../StartingPositions";

const Team = ({
                  teamIndex,
                  team,
                  canSelectFaction = [],
                  onSelectFactionClick = noop,
                  startingPositions
              }) => (
    <div className={`team team_${teamIndex}`}>
        <div className="team__slots">
            {team.map((playerAndFaction, slotIndex) => (
                <div key={slotIndex} className="team__slot">
                    <PlayerWithFaction player={playerAndFaction.player} faction={playerAndFaction.faction}
                                       canSelectFaction={includes(playerAndFaction.player.id)(canSelectFaction)} onSelectFactionClick={onSelectFactionClick}/>
                </div>
            ))}
        </div>
        <StartingPositions startingPositions={startingPositions}/>
    </div>
);

Team.propTypes = {
    teamIndex: React.PropTypes.number.isRequired,
    team: React.PropTypes.arrayOf(playerAndFactionShape).isRequired,
    canSelectFaction: React.PropTypes.arrayOf(React.PropTypes.string),
    onSelectFactionClick: React.PropTypes.func,
    startingPositions: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default Team;