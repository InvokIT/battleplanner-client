import "./map-minimap.css";

import React from "react";
import get from "lodash/fp/get";
import {mapShape} from "../shapes";

const MapMinimap = ({scenario}) => (
    <div className="map-minimap">
        <div className="map-minimap__image" alt={get("name", scenario)} style={{backgroundImage:`url(${get("minimap", scenario)}`}}/>
        <div className="map-minimap__name"><span>{get("name", scenario)}</span></div>
    </div>
);

MapMinimap.propTypes = {
    scenario: mapShape.isRequired
};

export default MapMinimap;