const initialState = {
    loading: false,
    error: null,
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "matches_load":
            return {
                loading: true,
                error: null,
                list: []
            };
        case "matches_loaded":
            return {
                loading: false,
                error: action.error,
                list: action.matches
            };
        default:
            return state;
    }
};