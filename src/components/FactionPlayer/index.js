import React from "react";
import {playerShape} from "../shapes";

const FactionPlayer = ({player, faction}) => (
    <div className="faction-player">
        <div className="faction-player__faction" title={faction.name}>
            <div className="faction-player__faction__image" style={{backgroundImage: faction.image}}/>
            <div className="faction-player__faction__name">{faction.name}</div>
        </div>
        <div className="faction-player__avatar" style={{backgroundImage:player.avatarUrl}} />
        <div className="faction-player__display-name">{player.displayName}</div>
    </div>
);


FactionPlayer.propTypes = {
    player: playerShape.isRequired,
    displayName: React.PropTypes.string.isRequired,
    faction: React.PropTypes.shape({
        image: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }).isRequired
};

export default FactionPlayer;