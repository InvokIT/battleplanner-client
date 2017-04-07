import React from "react";
import { Redirect } from "react-router";
import CreateMatchContainer from "../CreateMatchContainer";
import MatchListContainer from "../MatchListContainer";

const MatchBrowser = ({isAuthenticated}) => {
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="match-browser">
            <CreateMatchContainer/>
            <MatchListContainer/>
        </div>
    );
};

MatchBrowser.propTypes = {
    isAuthenticated: React.PropTypes.bool
};

export default MatchBrowser;