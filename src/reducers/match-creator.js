import set from "lodash/fp/set";

const initialState = {
    name: "GCS Semi-final & Finals",
    roundCount: 5
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "match-creator_name-change":
            return set("name", action.name)(state);
        case "match-creator_round-count-change":
            return set("roundCount", action.roundCount)(state);
        default:
            return state;
    }
};