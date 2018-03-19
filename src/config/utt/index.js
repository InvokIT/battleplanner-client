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
import pick from "lodash/fp/pick";
import values from "lodash/fp/values";
import uniq from "lodash/fp/uniq";
import isEqual from "lodash/fp/isEqual";
import elstOutskirtsImage from "./gfx/elst_outskirts.jpg";
import elstOutskirtsMinimap from "./gfx/elst_outskirts-minimap.jpg";
import railsAndMetalImage from "./gfx/rails_and_metal.jpg";
import railsAndMetalMinimap from "./gfx/rails_and_metal-minimap.jpg";
import vauxFarmlandsImage from "./gfx/vaux_farmlands.jpg";
import vauxFarmlandsMinimap from "./gfx/vaux_farmlands-minimap.jpg";
import crossingInTheWoodsImage from "./gfx/crossing_in_the_woods.jpg";
import crossingInTheWoodsMinimap from "./gfx/crossing_in_the_woods-minimap.jpg";
import factionUsfImage from "./gfx/faction_aef.png";
import factionUkfImage from "./gfx/faction_british.png";
import factionOstheerImage from "./gfx/faction_german.png";
import factionSovietImage from "./gfx/faction_soviet.png";
import factionOkwImage from "./gfx/faction_west_german.png";
import factionMissingImage from "./gfx/faction_missing.png";
import uttLogo from "./gfx/utt_logo.png";

export const teamSize = 2;

export const logoImage = uttLogo;

export const maps = [
    {
        id: "elst_outskirts",
        image: elstOutskirtsImage,
        minimap: elstOutskirtsMinimap,
        name: "Elst Outskirts",
        deciderPreference: 1,
        startingPositions: {
            "allies": [1, 2],
            "axis": [3, 4]
        }
    },
    {
        id: "rails_and_metal",
        image: railsAndMetalImage,
        minimap: railsAndMetalMinimap,
        name: "Rails and Metal",
        deciderPreference: 3,
        startingPositions: {
            "allies": [1, 2],
            "axis": [3, 4]
        }
    },
    {
        id: "vaux_farmlands",
        image: vauxFarmlandsImage,
        minimap: vauxFarmlandsMinimap,
        name: "Vaux Farmlands",
        deciderPreference: 4,
        startingPositions: {
            "allies": [1, 2],
            "axis": [3, 4]
        }
    },
    {
        id: "crossing in the woods",
        image: crossingInTheWoodsImage,
        minimap: crossingInTheWoodsMinimap,
        name: "Crossing in the Woods",
        deciderPreference: 2,
        startingPositions: {
            "allies": [1, 2],
            "axis": [3, 4]
        }
    }
];

export const factions = [
    {
        id: "soviet",
        name: "Soviet Union",
        image: factionSovietImage,
        side: "allies"
    },
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
        without(playedMapIds),
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
    const ownPlayerTeam = flow(
        get(`state.data.teams`),
        findIndex(t => includes(playerId, t))
    )(matchLobby);

    const ownTeamPlayerIds = get(`state.data.teams[${ownPlayerTeam}`)(matchLobby);
    const otherTeamPlayerIds = get(`state.data.teams[${(ownPlayerTeam + 1) % 2}]`)(matchLobby);

    const factionIdsOfOwnTeam = flow(
        get(`state.data.rounds[${currentRound}].factions`),
        pick(ownTeamPlayerIds),
        values,
        filter(fId => !isNil(fId))
    )(matchLobby);

    const factionIdsOfOtherTeam = flow(
        get(`state.data.rounds[${currentRound}].factions`),
        pick(otherTeamPlayerIds),
        values,
        filter(fId => !isNil(fId))
    )(matchLobby);

    const ownTeamSide = flow(
        find(f => f.id === head(factionIdsOfOwnTeam)),
        get("side")
    )(factions);

    const otherTeamSide = flow(
        find(f => f.id === head(factionIdsOfOtherTeam)),
        get("side")
    )(factions);

    const sides = flow(
        map("side"),
        filter(s => !isNil(s)),
        uniq
    )(factions);

    let allowedSides = sides;

    if (!isNil(ownTeamSide)) {
        allowedSides = [ownTeamSide];
    } else if (!isNil(otherTeamSide)) {
        allowedSides = flow(
            without([otherTeamSide])
        )(sides);
    }

    // Every second round we can only choose from the other side
    if (isEqual(sides, allowedSides) && currentRound % 2 !== 0) {
        const previousFactionId = get(`state.data.rounds[${currentRound-1}].factions[${playerId}]`)(matchLobby);
        const previousFaction = find(f => f.id === previousFactionId)(factions);
        const previousSide = get("side")(previousFaction);

        allowedSides = flow(without([previousSide]))(sides);
    }

    return flow(
        filter(has("side")),
        filter(f => includes(f.side)(allowedSides))
    )(factions);
};

export const getSelectableMaps = (matchState, playerId) => {
    // Only allow selection of maps not played yet
    const playedMapIds = flow(
        get("rounds"),
        map(round => round.map),
        filter(mapId => !isNil(mapId))
    )(matchState);

    return filter(map => !playedMapIds.includes(map.id))(maps);
};