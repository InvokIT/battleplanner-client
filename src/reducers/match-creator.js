const initialState = {
    name: "GCS Show 1"
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "match-creator_name-change":
            return {
                name: action.name
            };
        default:
            return state;
    }
};