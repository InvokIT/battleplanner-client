import React from "react";
import {Link} from 'react-router-dom'

const MatchListItem = ({name, url, players = []}) => {
    return (
        <div className="match-list-item">
            <Link to={url}>
                <span className="match-list-item__match-name">{name}</span>
                <ul className="match-list-item__players">
                    {players.map(player =>
                        <li className="match-list-item__player">
                            <div className="match-list-item__player-avatar"
                                 style={{backgroundImage: `url(${player.avatarUrl})`}} />
                            <span className="match-list-item__player-name">{player.displayName}</span>
                        </li>
                    )}
                </ul>
            </Link>
        </div>
    );
};

MatchListItem.propTypes = {
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
        displayName: React.PropTypes.string.isRequired,
        avatarUrl: React.PropTypes.string.isRequired
    }))
};

export default MatchListItem;