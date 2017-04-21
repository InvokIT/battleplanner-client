const initialState = {
    name: "GCS match v1"
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