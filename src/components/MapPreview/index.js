import React from "react";
import get from "lodash/fp/get";
import {mapShape} from "../shapes";

const MapPreview = ({map}) => (
    <div className="map-preview" title={get("name", map)}>
        <div className="map-preview__image" style={{backgroundImage:get("image", map)}}/>
        <div className="map-preview__name"><span>{get("name", map)}</span></div>
    </div>
);

MapPreview.propTypes = {
    map: mapShape
};

export default MapPreview;