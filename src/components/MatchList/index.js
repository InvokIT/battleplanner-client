import React from "react";
import MatchListItem from "../MatchListItem";
import "./MatchList.css";

const MatchList = ({matches}) => {
    return (
        <div className="match-list">
            <ul>
                {matches.map(m => <MatchListItem key={m.id} {...m} />)}
            </ul>
        </div>
    );
};

MatchList.propTypes = {
    matches: React.PropTypes.array.isRequired
};

export default MatchList;