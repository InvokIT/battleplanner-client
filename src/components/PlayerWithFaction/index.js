import React from "react";
import {playerShape} from "../shapes";

const PlayerWithFaction = ({player, faction}) => (
    <div className="player-with-faction">
        <div className="player-with-faction__faction" title={faction.name}>
            <div className="player-with-faction__faction__image" style={{backgroundImage: faction.image}}/>
            <div className="player-with-faction__faction__name">{faction.name}</div>
        </div>
        <div className="player-with-faction__avatar" style={{backgroundImage:player.avatarUrl}} />
        <div className="player-with-faction__display-name">{player.displayName}</div>
    </div>
);


PlayerWithFaction.propTypes = {
    player: playerShape.isRequired,
    faction: React.PropTypes.shape({
        image: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired
};

export default PlayerWithFaction;