import "./player-list-button.css";

import React from "react";
import noop from "lodash/fp/noop";
import PlayerList from "../PlayerList";
import {playerShape} from "../shapes";

const PlayerListButton = ({onClick, onPlayerClick = noop, players = [], showList = false}) => {
    const extraClassNames = [];

    if (showList) {
        extraClassNames.push("player-list-button_show-list")
    }

    return (
        <div className={`player-list-button ${extraClassNames.join(" ")}`}>
            <button className="player-list-button__button" onClick={onClick} title="Player list"/>
            {showList ? <PlayerList players={players} onPlayerClick={onPlayerClick}/> : null}
        </div>
    );
};

PlayerListButton.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    onPlayerClick: React.PropTypes.func,
    players: React.PropTypes.arrayOf(playerShape),
    showList: React.PropTypes.bool
};

export default PlayerListButton;