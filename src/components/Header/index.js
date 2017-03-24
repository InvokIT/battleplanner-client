import React from "react";
import "./Header.css"
import UserAvatar from "../UserAvatar";
import LogoutButtonContainer from "../LogoutButtonContainer";

const Header = ({user}) => {
    let userUi;

    if (user) {
        userUi = (
            <div className="header__current-user">
                <UserAvatar avatarUrl={user.avatarUrl} />
                <span className="header__current-user__display-name">{user.displayName}</span>
                <LogoutButtonContainer />
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
    user: React.PropTypes.object
};

export default Header;
