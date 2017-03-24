import React from "react";
import MatchListItem from "../MatchListItem";
import "./MatchList.css";

const MatchList = ({matches}) => {
    return (
        <div className="match-list">
            <ul>
                {matches.list.map(m => <MatchListItem {...m} />)}
            </ul>
        </div>
    );
};

MatchList.propTypes = {
    matches: React.PropTypes.shape({
        error: React.PropTypes.string,
        loading: React.PropTypes.bool,
        list: React.PropTypes.array
    })
};

export default MatchList;