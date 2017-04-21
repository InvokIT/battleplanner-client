import "./map-selector.css";

import React from "react";
import MapPreview from "../MapPreview";
import {mapShape} from "../shapes";

const MapSelector = ({isVisible, maps, onMapSelected, onCancelClick}) => {
    if (!isVisible) {
        return null;
    }

    // TODO Minimap preview?

    return (
        <div className="map-selector">
            <div className="map-selector__items">
                {maps.map(map => (
                    <div key={map.id} className="map-selector__item"
                         onClick={onMapSelected.bind(null, map)}>
                        <MapPreview scenario={map}/>
                    </div>
                ))}
            </div>
            <div className="map-selector__title">Select a map</div>
            <div className="map-selector__cancel-button">
                <button onClick={onCancelClick}>Cancel</button>
            </div>
        </div>
    );
};

MapSelector.propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    maps: React.PropTypes.arrayOf(mapShape).isRequired,
    onMapSelected: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired
};

export default MapSelector;