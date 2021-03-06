import "./paypal-button.css";

import React from "react";

const PaypalButton = () => (
    <div className="paypal-button">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
            <input type="hidden" name="cmd" value="_s-xclick"/>
            <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
"/>
            <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif"
                   name="submit" alt="PayPal – The safer, easier way to pay online!"/>
            <aside>to Battle Planner</aside>
            <img alt="" src="https://www.paypalobjects.com/da_DK/i/scr/pixel.gif" width="1"
                 height="1"/>
        </form>
    </div>
);

export default PaypalButton;