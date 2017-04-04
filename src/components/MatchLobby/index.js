import React from "react";
import FactionPlayer from "../FactionPlayer";
import Loading from "../Loading";
import MatchRounds from "../MatchRounds";
import {playerShape, roundShape, teamPlayerShape }from "../shapes";

const MatchLobby = ({loading, title, matchState}) => {
    const {description, map, rounds, players, teams} = matchState || {};

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="match-lobby">
            <div className="match-lobby__title">{title}</div>
            <div className="match-lobby__state-description">{description}</div>
            {teams.map((t, i) => (
                <div key={i} className={`match-lobby-team match-lobby-team__${i}`}>
                    {t.map(p => <FactionPlayer displayName={p.displayName} faction={p.faction} />)}
                </div>
            ))}
            <div className="match-lobby__coin">
            </div>
            <div className="match-lobby__map">
                <div className="match-lobby__map-image" style={{backgroundImage:map.image}}></div>
                <div className="match-lobby__map-name"><span>{map.name}</span></div>
            </div>
            <div className="match-lobby__actions">
            </div>
            <div className="match-lobby__players">
            </div>
            <div className="match-lobby__rounds">
                <MatchRounds rounds={rounds} />
            </div>
        </div>
    )
};

MatchLobby.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    matchState: React.PropTypes.shape({
        description: React.PropTypes.string,
        map: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            image: React.PropTypes.string.isRequired
        }),
        rounds: React.PropTypes.arrayOf(roundShape),
        players: React.PropTypes.arrayOf(playerShape),
        teams: React.PropTypes.arrayOf(React.PropTypes.arrayOf(teamPlayerShape))
    })
};

export default MatchLobby;