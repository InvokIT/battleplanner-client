import React from "react";
import {roundShape} from "../shapes";

const MatchRounds = ({rounds}) => (
    <div className="match-rounds">
        {rounds.map((round, i) => (
            <div key={i} className={`match-round match-round__${i}`}>
                <div className="match-round__map">{round.map.name}</div>
                <div className="match-round__winner">{round.winner.displayName}</div>
                <div className="match-round__victory-points">{round.winnerVictoryPoints}</div>
            </div>
        ))}
    </div>
);

MatchRounds.propTypes = {
    rounds: React.PropTypes.arrayOf(roundShape)
};

export default MatchRounds;