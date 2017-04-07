import "./faction.css";

import React from "react";
import {factionShape} from "../shapes";

const Faction = ({faction}) => (
        <div className="faction">
            <div className="faction__name"><span>{faction.name}</span></div>
            <div className="faction__image" title={faction.name} style={{backgroundImage: `url(${faction.image})`}}/>
        </div>
);

Faction.propTypes = {
    faction: factionShape.isRequired
};

export default Faction;