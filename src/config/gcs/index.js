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
import faymonvilleImage from "./gfx/faymonville_approach.jpg";
import kholodnyImage from "./gfx/kholodny_ferma_summer.jpg";
import crossroadsImage from "./gfx/crossroads.jpg";
import crossingInTheWoodsImage from "./gfx/crossing_in_the_woods.jpg";
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
        name: "Faymonville Approach",
        deciderPreference: 1
    },
    {
        id: "kholodny ferma summer",
        image: kholodnyImage,
        name: "Kholodny Ferma (Summer)",
        deciderPreference: 2
    },
    {
        id: "crossroads",
        image: crossroadsImage,
        name: "Crossroads",
        deciderPreference: 3
    },
    {
        id: "crossing in the woods",
        image: crossingInTheWoodsImage,
        name: "Crossing in the Woods"
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
        name:"",
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