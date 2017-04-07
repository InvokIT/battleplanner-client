import React from "react";
import {playerShape} from "../shapes";

const AssignPlayer = ({players, onPlayerSelected}) => {
    const options = [{
        id: null,
        displayName: "Assign player...",
        avatarUrl: null
    }].concat(players);

    return (
        <div className="assign-player">
            <select onChange={onPlayerSelected} valueKey="displayName">
                {options.map(p => <option value={p.id}>{p.displayName}</option>)}
            </select>
        </div>
    );
};

AssignPlayer.propTypes = {
    players: React.PropTypes.arrayOf(playerShape).isRequired,
    onPlayerSelected: React.PropTypes.func.isRequired
};

export default AssignPlayer;