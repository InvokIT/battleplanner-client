import "./player-list.css";

import React from "react";
import Player from "../Player";
import { playerShape } from "../shapes";

const PlayerList = ({players = [], onPlayerClick}) => (
    <ul className="player-list">
        {players.map(player => (
            <li onClick={onPlayerClick}>
                <Player displayName={player.displayName} avatarUrl={player.avatarUrl}/>
            </li>
        ))}
    </ul>
);

PlayerList.propTypes = {
    players: React.PropTypes.arrayOf(playerShape),
    onPlayerClick: React.PropTypes.func
}

export default PlayerList;