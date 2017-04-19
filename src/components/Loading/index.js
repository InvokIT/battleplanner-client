import "./loading.css";

import React from "react";

const Loading = ({text = "Loading..."}) => (
    <div className="loading"><span>{text}</span></div>
);

Loading.propTypes = {
    text: React.PropTypes.string
};

export default Loading;