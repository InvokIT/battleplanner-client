import "./match-rounds.css";

import React from "react";
import get from "lodash/fp/get";
import isNil from "lodash/fp/isNil";
import flow from "lodash/fp/flow";
import {roundShape} from "../shapes";
import MapPreview from "../MapPreview";
import Faction from "../Faction";

const MatchRounds = ({rounds, currentRoundNumber}) => (
    <div className="match-rounds">
        <div className="match-rounds__title">Rounds</div>
        <div className={`match-rounds__items match-rounds__items-${rounds.length}`}>
            {rounds.map((round, i) => {
                const itemClassNames = ["match-round", `match-round_${i}`];

                if (flow(get("winner"), isNil)(round)) {
                    itemClassNames.push("match-round__not-played");
                } else {
                    itemClassNames.push("match-round__played");
                }

                if (i === currentRoundNumber) {
                    itemClassNames.push("match-round__current-round");
                }

                const winnerName = get("winner.player.displayName", round);
                const vps = get("winnerVictoryPoints", round);
                const winnerFaction = get("winner.faction", round);
                const hasWinner = !isNil(vps);

                return (
                    <div key={i} className={itemClassNames.join(" ")}>
                        <div className="match-round__number"><span>{i + 1}</span></div>
                        <MapPreview scenario={get("map", round)}/>
                        {hasWinner
                            ?
                            <div className="match-round__winner">
                                <div className="match-round__winner-player">
                                    <Faction faction={winnerFaction}/>
                                    <div className="match-round__winner-name">{winnerName}</div>
                                </div>
                                <div className="match-round__victory-points">
                                    <span>{vps}</span>
                                    <span>&nbsp;VPs</span>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                );
            })}
        </div>
    </div>
);

MatchRounds.propTypes = {
    rounds: React.PropTypes.arrayOf(roundShape).isRequired,
    currentRoundNumber: React.PropTypes.number.isRequired
};

export default MatchRounds;