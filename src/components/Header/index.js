import React from "react";
import "./Header.css"
import LogoutButtonContainer from "../LogoutButtonContainer";

const Header = ({user}) => {
    return (
        <div className="header">
            <h1>Battle Planner</h1>
            <LogoutButtonContainer />
        </div>
    );
};

Header.propTypes = {

};

export default Header;
