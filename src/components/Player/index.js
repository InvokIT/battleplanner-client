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

Player.PropTypes = {
    displayName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string.isRequired
};

export default Player;