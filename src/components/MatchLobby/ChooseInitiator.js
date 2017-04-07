import React from "react";
import MatchRoundsContainer from "../MatchRoundsContainer";
import TeamContainer from "../TeamContainer";
import CoinFlipContainer from "../CoinFlipContainer"

const ChooseInitiator = ({matchId, stateDescription}) => (
    <div className="app-content">
        <div className="match-lobby">
            {/*<div className="match-lobby__title">{title}</div>*/}
            <div className="match-lobby__components">
                <TeamContainer matchId={matchId} teamIndex={0}/>
                <div className="match-lobby_center-component">
                    <CoinFlipContainer matchId={matchId}/>
                </div>
                <TeamContainer matchId={matchId} teamIndex={1}/>
            </div>
            <div className="match-lobby__state-description"><span>{stateDescription}</span></div>
        </div>
        <MatchRoundsContainer matchId={matchId}/>
    </div>
);

ChooseInitiator.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    stateDescription: React.PropTypes.string.isRequired
};


export default ChooseInitiator;