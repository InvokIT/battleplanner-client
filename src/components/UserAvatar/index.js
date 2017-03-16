import React from "react";
import "./UserAvatar.css"

const UserAvater = ({avatarUrl}) => (
    <div className="user-avatar" style={{backgroundImage:`url(${avatarUrl})`}}></div>
);

UserAvater.propTypes = {
    avatarUrl: React.PropTypes.string.isRequired
};

export default UserAvater;