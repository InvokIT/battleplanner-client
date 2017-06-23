import "./match-over.css";


import React from "react";
import Player from "../Player";
// import CreateMatchContainer from "../CreateMatchContainer";
import {playerShape} from "../shapes";

const MatchOver = ({winner, showCreateMatch = false}) => {
    const winnerName = winner.displayName;
    const winnerAvatar = winner.avatarUrl;

    return (
        <div className="match-over">
            <div className="match-over__dialog">
                <span className="match-over__title">Winner</span>
                <div className="match-over__player">
                    <Player displayName={winnerName} avatarUrl={winnerAvatar}/>
                </div>
            </div>
            {/*{showCreateMatch ? <CreateMatchContainer/> : null}*/}
        </div>
    );
};

MatchOver.propTypes = {
    winner: playerShape.isRequired,
    showCreateMatch: React.PropTypes.bool
};

export default MatchOver;