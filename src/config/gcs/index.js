import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import filter from "lodash/fp/filter";
import has from "lodash/fp/has";
import without from "lodash/fp/without";
import sortBy from "lodash/fp/sortBy";
import head from "lodash/fp/head";
import tail from "lodash/fp/tail";
import isNil from "lodash/fp/isNil";
import find from "lodash/fp/find";
import findIndex from "lodash/fp/findIndex";
import includes from "lodash/fp/includes";
import faymonvilleImage from "./gfx/faymonville_approach.jpg";
import faymonvilleMinimap from "./gfx/faymonville_approach-minimap.jpg";
import kholodnyImage from "./gfx/kholodny_ferma_summer.jpg";
import kholodnyMinimap from "./gfx/kholodny_ferma_summer-minimap.jpg";
import crossroadsImage from "./gfx/crossroads.jpg";
import crossroadsMinimap from "./gfx/crossroads-minimap.jpg";
import crossingInTheWoodsImage from "./gfx/crossing_in_the_woods.jpg";
import crossingInTheWoodsMinimap from "./gfx/crossing_in_the_woods-minimap.jpg";
import factionUsfImage from "./gfx/faction_aef.png";
import factionUkfImage from "./gfx/faction_british.png";
import factionOstheerImage from "./gfx/faction_german.png";
import factionSovietImage from "./gfx/faction_soviet.png";
import factionOkwImage from "./gfx/faction_west_german.png";
import factionMissingImage from "./gfx/faction_missing.png";

export const teamSize = 1;

export const maps = [
    {
        id: "faymonville approach",
        image: faymonvilleImage,
        minimap: faymonvilleMinimap,
        name: "Faymonville Approach",
        deciderPreference: 1,
        startingPositions: {
            "allies": [1],
            "axis": [2]
        }
    },
    {
        id: "kholodny ferma summer",
        image: kholodnyImage,
        minimap: kholodnyMinimap,
        name: "Kholodny Ferma (Summer)",
        deciderPreference: 2,
        startingPositions: {
            "allies": [1],
            "axis": [2]
        }
    },
    {
        id: "crossroads",
        image: crossroadsImage,
        minimap: crossroadsMinimap,
        name: "Crossroads",
        deciderPreference: 3,
        startingPositions: {
            "allies": [1],
            "axis": [2]
        }
    },
    {
        id: "crossing in the woods",
        image: crossingInTheWoodsImage,
        minimap: crossingInTheWoodsMinimap,
        name: "Crossing in the Woods",
        deciderPreference: 4,
        startingPositions: {
            "allies": [1, 2],
            "axis": [3, 4]
        }
    }
];

export const factions = [
    {
        id: "usf",
        name: "US Forces",
        image: factionUsfImage,
        side: "allies"
    },
    {
        id: "ukf",
        name: "British Forces",
        image: factionUkfImage,
        side: "allies"
    },
    {
        id: "ostheer",
        name: "Wehrmacht Ostheer",
        image: factionOstheerImage,
        side: "axis"
    },
    {
        id: "soviet",
        name: "Soviet Union",
        image: factionSovietImage,
        side: "allies"
    },
    {
        id: "okw",
        name: "Oberkommando West",
        image: factionOkwImage,
        side: "axis"
    },
    {
        id: "missing",
        name:"No faction selected",
        image: factionMissingImage
    }
];

export const findDeciderMap = (matchState) => {
    const playedMapIds = flow(
        get("rounds"),
        map(r => r.map)
    )(matchState);

    const deciderMapIds = flow(
        filter(has("deciderPreference")),
        sortBy(m => m.deciderPreference),
        map(m => m.id)
    )(maps);

    const selectedDeciderMap = flow(
        without(...playedMapIds),
        head
    )(deciderMapIds);

    if (isNil(selectedDeciderMap)) {
        return tail(deciderMapIds);
    } else {
        return selectedDeciderMap;
    }
};

export const getSelectableFactions = (matchLobby, playerId) => {
    const currentRound = get("state.data.currentRound")(matchLobby);
    const thisPlayerTeam = flow(
        get(`state.data.teams`),
        findIndex(t => includes(playerId, t))
    )(matchLobby);

    const otherTeamPlayerId = flow(
        get(`state.data.teams[${(thisPlayerTeam + 1) % 2}]`),
        head
    )(matchLobby);

    const factionIdOfOtherTeamPlayer = get(`state.data.rounds[${currentRound}].factions.${otherTeamPlayerId}`)(matchLobby);
    const otherTeamSide = flow(
        find(f => f.id === factionIdOfOtherTeamPlayer),
        get("side")
    )(factions);

    let disallowedSide = otherTeamSide;

    // Every second round we can only choose from the other side
    if (isNil(disallowedSide) && currentRound % 2 !== 0) {
        const previousFactionId = get(`state.data.rounds[${currentRound-1}].factions[${playerId}]`)(matchLobby);
        const previousFaction = find(f => f.id === previousFactionId)(factions);
        const previousSide = get("side")(previousFaction);
        disallowedSide = previousSide;
    }

    return flow(
        filter(has("side")),
        filter(f => f.side !== disallowedSide)
    )(factions);
};

export const getSelectableMaps = (matchState, playerId) => {
    return maps;
};