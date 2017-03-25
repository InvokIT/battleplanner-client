const initialState = {
    title: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "match-creator_title-change":
            return {
                title: action.title
            };
        default:
            return state;
    }
};