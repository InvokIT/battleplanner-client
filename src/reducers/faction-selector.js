const initialState = {
    isOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "faction-selector_open":
            return {
                isOpen: true
            };
        case "faction-selector_close":
            return {
                isOpen: false
            };
        default:
            return state;
    }
};