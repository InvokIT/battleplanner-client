import React from "react";
import "./Header.css"
import LogoutButtonContainer from "../LogoutButtonContainer";
import gcsLogo from "../../config/gcs/gfx/gcs_logo.png";

const Header = ({user}) => {
    return (
        <div className="header">
            <img className="header_gcs-logo" src={gcsLogo} />
            <LogoutButtonContainer />
        </div>
    );
};

Header.propTypes = {

};

export default Header;
