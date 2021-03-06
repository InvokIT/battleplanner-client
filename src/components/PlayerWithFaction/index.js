import "./player-with-faction.css";

import React from "react";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import noop from "lodash/fp/noop";
import defaultTo from "lodash/fp/defaultTo";
import flow from "lodash/fp/flow";
import Faction from "../Faction";
import {playerShape, factionShape} from "../shapes";
import { factions } from "../../config";
import defaultAvatar from "../../gfx/default-avatar.png";

const missingFaction = find(f => f.id === "missing", factions);

const PlayerWithFaction = ({player, faction = missingFaction, canSelectFaction = false, onSelectFactionClick = noop}) => {
    const classNames = ["player-with-faction"];

    if (canSelectFaction) {
        classNames.push("can-select-faction");
    }

    const playerName = flow(
        get("displayName"),
        defaultTo("")
    )(player);

    const avatarUrl = flow(
        get("avatarUrl"),
        defaultTo(defaultAvatar)
    )(player);

    return (
        <div className={classNames.join(" ")}>
            <div className="player-with-faction__player">
                <div className="player-with-faction__player-avatar" style={{backgroundImage: `url(${avatarUrl})`}}/>
                <div className="player-with-faction__player-name">{playerName}</div>
            </div>
            <div className="player-with-faction__faction">
                <Faction faction={faction} />
                <div className="player-with-faction__faction-click-area" onClick={e => onSelectFactionClick(player.id)}>
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