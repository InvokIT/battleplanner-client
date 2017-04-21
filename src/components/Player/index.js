import "./player.css";

import React from "react";
import UserAvatar from "../UserAvatar";

const Player = ({displayName, avatarUrl}) => {
    return (
        <div className="player">
            <UserAvatar avatarUrl={avatarUrl}/>
            <div className="player__display-name">{displayName}</div>
        </div>
    );
};

Player.propTypes = {
    displayName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string
};

export default Player;