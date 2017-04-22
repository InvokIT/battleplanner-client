import "./faction-selector.css";

import React from "react";
import Faction from "../Faction";
import {factionShape} from "../shapes";

const FactionSelector = ({isVisible, playerId, factions, onFactionSelected, onCancelClick}) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="faction-selector">
            <div className="faction-selector__title">Select a faction</div>
            <div className="faction-selector__items">
                {factions.map(faction => (
                    <div key={faction.id} className="faction-selector__item"
                         onClick={onFactionSelected.bind(null, playerId, faction)}>
                        <Faction faction={faction}/>
                    </div>
                ))}
            </div>
            <div className="faction-selector__cancel-button">
                <button onClick={onCancelClick}>Cancel</button>
            </div>
        </div>
    );
};

FactionSelector.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    factions: React.PropTypes.arrayOf(factionShape).isRequired,
    playerId: React.PropTypes.string,
    onFactionSelected: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired
};

export default FactionSelector;