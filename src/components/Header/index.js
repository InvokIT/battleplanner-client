import React from "react";
import "./Header.css"
import LogoutButtonContainer from "../LogoutButtonContainer";
import gcsLogo from "../../config/gcs/gfx/gcs_logo.png";

const Header = ({user}) => {
    return (
        <div className="header">
            <img className="header_gcs-logo" src={gcsLogo} />
            <div className="header__text">
                <h1>Battle Planner</h1>
                <aside>by InvokIT LTD</aside>
            </div>
            <LogoutButtonContainer />
        </div>
    );
};

Header.propTypes = {

};

export default Header;
