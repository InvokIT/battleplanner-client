import set from "lodash/fp/set";
import clamp from "lodash/fp/clamp";

const initialState = {
    victoryPoints: 500,
    winnerTeam: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "post-results_set-victory-points":
            return set(
                "victoryPoints",
                clamp(0, 500)(action.victoryPoints)
            )(state);
        case "post-results_set-winner":
            return set("winnerTeam", action.winnerTeam)(state);
        case "post-results_reset":
            return initialState;
        default:
            return state;
    }
};