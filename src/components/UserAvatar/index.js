import "./UserAvatar.css";

import React from "react";
import defaultAvatar from "../../gfx/default-avatar.png";

const UserAvater = ({avatarUrl = defaultAvatar}) => (
    <div className="user-avatar" style={{backgroundImage:`url(${avatarUrl})`}}></div>
);

UserAvater.propTypes = {
    avatarUrl: React.PropTypes.string
};

export default UserAvater;