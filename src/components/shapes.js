import {PropTypes} from "react";

export const matchShape = PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired
});

export const playerShape = PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
});

export const roundShape = PropTypes.shape({
    map: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }),
    winner: playerShape,
    winnerVictoryPoints: PropTypes.number
});

export const playerAndFactionShape = PropTypes.shape({
    player: playerShape.isRequired,
    faction: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    })
});

export const mapShape = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};