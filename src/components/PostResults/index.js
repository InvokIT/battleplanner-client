import "./post-results.css";

import React from "react";
import get from "lodash/fp/get";
import isNil from "lodash/fp/isNil";
import first from "lodash/fp/first";
import Player from "../Player";
import {playerShape} from "../shapes";

const PostResults = ({canPostResults, canContinue, victoryPoints, teams, selectedTeam, onWinnerSelected, onVictoryPointsChange, onContinueClick, hideVictoryPoints = false}) => {
    if (!canPostResults) {
        return null;
    }

    return (
        <div className="post-results">
            <div className="post-results__dialog">
                <span className="post-results__title">Who won?</span>
                <div className="post-results__teams">
                    {teams.map((team, teamNumber) => {
                        const player = first(team);
                        const classNames = [];

                        if (teamNumber === selectedTeam) {
                            classNames.push("post-results__team_selected");
                        } else if (!isNil(selectedTeam)) {
                            classNames.push("post-results__team_not-selected")
                        }

                        return (
                            <div key={player.id}
                                 onClick={e => onWinnerSelected(teamNumber)}
                                 className={`post-results__team ${classNames.join(" ")}`}
                            >
                                <Player displayName={player.displayName} avatarUrl={player.avatarUrl}/>
                            </div>
                        )
                    })}
                </div>
                {hideVictoryPoints ? null :
                    <div className="post-results__victory-points">
                        <label>
                            <span>with</span>
                            <input
                                type="number"
                                min="1"
                                max="500"
                                value={victoryPoints}
                                onChange={e => onVictoryPointsChange(e.target.value)}
                                autoComplete="off"/>
                            <span>Victory Points</span>
                        </label>
                    </div>
                }
            </div>
            <button className="post-results__submit-button" onClick={e => onContinueClick(selectedTeam, victoryPoints)} disabled={!canContinue}>
                <span>Submit</span>
            </button>
        </div>
    );
};

PostResults.propTypes = {
    canPostResults: React.PropTypes.bool.isRequired,
    canContinue: React.PropTypes.bool.isRequired,
    victoryPoints: React.PropTypes.number.isRequired,
    teams: React.PropTypes.arrayOf(React.PropTypes.arrayOf(playerShape)).isRequired,
    selectedTeam: React.PropTypes.number,
    onWinnerSelected: React.PropTypes.func.isRequired,
    onVictoryPointsChange: React.PropTypes.func.isRequired,
    onContinueClick: React.PropTypes.func.isRequired,
    hideVictoryPoints: React.PropTypes.bool
};


export default PostResults;