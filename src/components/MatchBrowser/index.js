import React from "react";
import CreateMatchContainer from "../CreateMatchContainer";
import MatchListContainer from "../MatchListContainer";

const MatchBrowser = () => (
    <div className="match-browser">
        <CreateMatchContainer/>
        <MatchListContainer/>
    </div>
);

export default MatchBrowser;