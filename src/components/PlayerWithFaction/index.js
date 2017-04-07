import "./player-with-faction.css";

import React from "react";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import noop from "lodash/fp/noop";
import Faction from "../Faction";
import {playerShape, factionShape} from "../shapes";
import { factions } from "../../config";

const missingFaction = find(f => f.id === "missing", factions);

const PlayerWithFaction = ({player, faction = missingFaction, canSelectFaction = false, onSelectFactionClick = noop}) => {
    const classNames = ["player-with-faction"];

    if (canSelectFaction) {
        classNames.push("can-select-faction");
    }

    return (
        <div className={classNames.join(" ")}>
            <div className="player-with-faction__player">
                <div className="player-with-faction__player-avatar" style={{backgroundImage: `url(${get("avatarUrl", player)})`}}/>
                <div className="player-with-faction__player-name">{get("displayName", player)}</div>
            </div>
            <div className="player-with-faction__faction">
                <Faction faction={faction} />
                <div className="player-with-faction__faction-click-area">
                    <div className="player-with-faction__faction-click-text click-me-text"><span>Click to select faction</span></div>
                </div>
            </div>
        </div>
    );
};


PlayerWithFaction.propTypes = {
    player: playerShape,
    faction: factionShape,
    canSelectFaction: React.PropTypes.bool,
    onSelectFactionClick: React.PropTypes.func
};

export default PlayerWithFaction;