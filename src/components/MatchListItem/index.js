import React from "react";

const MatchListItem = ({title, id, players}) => {
    return (
        <div className="match-list-item">
            <span className="match-list-item__title">{title}</span>
            <ul className="match-list-item__players">
                {players.map(player =>
                    <li className="match-list-item__player">
                        <div className="match-list-item__player-avatar" style={{backgroundImage:`url(${player.avatarUrl})`}}></div>
                        <span>{player.displayName}</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

MatchListItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        displayName: React.PropTypes.string.isRequired,
        avatarUrl: React.PropTypes.string.isRequired
    }))
};

export default MatchListItem;