import "./footer.css"

import React from "react";
import PaypalButton from "../PaypalButton";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__text">
                <span>Battle Planner</span>
                <aside>by <a href="mailto:sj@invokit.dk">Sebastian 'Qvazar' J&oslash;rgensen</a></aside>
            </div>
            <PaypalButton/>
        </div>
    );
};

Footer.propTypes = {

};

export default Footer;
