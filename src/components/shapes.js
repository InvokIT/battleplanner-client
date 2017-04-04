import React, {PropTypes} from "react";

export const playerShape = React.PropTypes.shape({
    displayName: React.PropTypes.string.isRequired,
    avatarUrl: React.PropTypes.string.isRequired,
});

export const roundShape = React.PropTypes.shape({
    map: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired
    }),
    winner: playerShape,
    winnerVictoryPoints: React.PropTypes.number
});

export const teamPlayerShape = React.PropTypes.shape({
    displayName: React.PropTypes.string.isRequired,
    faction: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired
    })
});

