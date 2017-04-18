// @flow
import "./starting-positions.css";

import React from "react";
import isNil from "lodash/fp/isNil";

const StartingPositions = ({startingPositions} : {startingPositions: ?Array<number>}) => {
    if (isNil(startingPositions)) {
        return null;
    }

    return (
        <div className="starting-positions">
            <span className="starting-positions__title">Starting position</span>
            {startingPositions.map(startingPosition => (
                <span className="starting-positions__value">{startingPosition}</span>
            ))}
        </div>
    );
};

StartingPositions.propTypes = {
    startingPositions: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default StartingPositions;