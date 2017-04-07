const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "matches_loading":
            return {};
        case "matches_loaded":
            return action.matches.reduce(
                (acc, m) => {
                    acc[m.id] = m;
                    return acc;
                },
                {}
            );
        case "match_loaded":
            const match = action.match;
            return {
                ...state,
                [match.id]: match
            };
        default:
            return state;
    }
};