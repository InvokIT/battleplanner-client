import React from "react";
import FactionPlayer from "../FactionPlayer";

const Match = ({currentRound, rounds, players, teams}) => (
    <div className="match">
        {teams.map((t, i) => {
            //noinspection BadExpressionStatementJS
            <div className={`match__team match__team-${i}`}>
                {t.map(p => <FactionPlayer displayName={p.displayName} faction={p.faction} />)}
            </div>
        })}
        <div className="match__coin">
        </div>
        <div className="match__map">
        </div>
        <div className="match__actions">
        </div>
    </div>
);

const roundShape = React.PropTypes.shape({
    map: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired
    }),
    result: React.PropTypes.shape({
        
    })
});

const playerShape = React.PropTypes.shape({
    displayName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
});

const teamPlayerShape = React.PropTypes.shape({
    displayName: React.PropTypes.string.isRequired,
    faction: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired
    })
})

Match.propTypes = {
    currentRound: roundShape.isRequired,
    rounds: React.PropTypes.arrayOf(roundShape).isRequired,
    players: React.PropTypes.arrayOf(playerShape).isRequired,
    teams: React.PropTypes.arrayOf(React.PropTypes.arrayOf(teamPlayerShape)).isRequired
};

export default Match;