import "./map-preview.css";

import React from "react";
import get from "lodash/fp/get";
import {mapShape} from "../shapes";

const MapPreview = ({scenario}) => (
    <div className="map-preview" title={get("name", scenario)}>
        <div className="map-preview__image" alt={get("name", scenario)} style={{backgroundImage:`url(${get("image", scenario)}`}}/>
        <div className="map-preview__name"><span>{get("name", scenario)}</span></div>
    </div>
);

MapPreview.propTypes = {
    scenario: mapShape
};

export default MapPreview;