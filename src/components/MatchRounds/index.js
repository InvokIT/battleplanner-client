import "./match-rounds.css";

import React from "react";
import get from "lodash/fp/get";
import isNil from "lodash/fp/isNil";
import {roundShape} from "../shapes";
import MapPreview from "../MapPreview";

const MatchRounds = ({rounds}) => (
    <div className="match-rounds">
        {rounds.map((round, i) => (
            <div key={i} className={`match-round match-round_${i} ${isNil("winner", round) ? "match-round__played" : "match-round__not-played"}`}>
                <div className="match-round__number"><span>{i+1}</span></div>
                <MapPreview map={get("map", round)}/>
                <div className="match-round__winner">{get("winner.displayName", round)}</div>
                <div className="match-round__victory-points">{get("winnerVictoryPoints", round)}</div>
            </div>
        ))}
    </div>
);

MatchRounds.propTypes = {
    rounds: React.PropTypes.arrayOf(roundShape)
};

export default MatchRounds;