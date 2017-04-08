const initialState = {
    isOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "map-selector_open":
            return {
                isOpen: true
            };
        case "map-selector_close":
            return {
                isOpen: false
            };
        default:
            return state;
    }
};