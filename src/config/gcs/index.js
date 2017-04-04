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