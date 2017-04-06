import React from "react";
import MatchRoundsContainer from "../MatchRoundsContainer";
import TeamContainer from "../TeamContainer";
import CoinFlipContainer from "../CoinFlipContainer"

const ChooseInitiator = ({matchId}) => (
    <div className="app-content">
        <div className="match-lobby">
            {/*<div className="match-lobby__title">{title}</div>*/}
            {/*<div className="match-lobby__state-description">{description}</div>*/}
            <TeamContainer matchId={matchId} teamIndex={0}/>
            <CoinFlipContainer matchId={matchId}/>
            <TeamContainer matchId={matchId} teamIndex={1}/>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

ChooseInitiator.propTypes = {
    matchId: React.PropTypes.string.isRequired
};


export default ChooseInitiator;