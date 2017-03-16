import React from "react";
import "./Header.css"
import UserAvatar from "../UserAvatar";

const Header = ({userDisplayName, userAvatarUrl}) => {
    let userUi;

    if (userDisplayName || userAvatarUrl) {
        userUi = (
            <div className="header__current-user">
                {userAvatarUrl ? <UserAvatar avatarUrl={userAvatarUrl} /> : null}
                <span className="header__current-user__display-name">{userDisplayName}</span>
            </div>
        );
    }

    return (
        <div className="header">
            <h1>Battle Planner</h1>
            {userUi}
        </div>
    );
};

Header.propTypes = {
    userDisplayName: React.PropTypes.string,
    userAvatarUrl: React.PropTypes.string
};

export default Header;
