import "./lobby-map.css";

import React from "react";
import noop from "lodash/fp/noop";
import {mapShape}from "../shapes";
import MapPreview from "../MapPreview";

const LobbyMap = ({scenario, canSelectMap = false, onSelectMapClick = noop}) => {
    const classNames = ["lobby-map"];

    if (canSelectMap) {
        classNames.push("can-select-map")
    }

    // TODO Placeholder when no map is selected yet
    // TODO Preview with starting positions?

    return (
        <div className={classNames.join(" ")}>
            <MapPreview scenario={scenario}/>
            <div className="lobby-map__click-area" onClick={onSelectMapClick}>
                <div className="lobby-map__click-text click-me-text"><span>Click to select map</span></div>
            </div>
            <div className="lobby-map__title"><span>Map</span></div>
        </div>
    );
};

LobbyMap.propTypes = {
    scenario: mapShape,
    canSelectMap: React.PropTypes.bool,
    onSelectMapClick: React.PropTypes.func
};


export default LobbyMap;