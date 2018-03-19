import React from "react";
import "./Header.css"
import LogoutButtonContainer from "../LogoutButtonContainer";
import { logoImage } from "../../config";

const Header = () => {
    return (
        <div className="header">
            <img className="header_gcs-logo" src={logoImage} />
            <LogoutButtonContainer />
        </div>
    );
};

Header.propTypes = {

};

export default Header;
