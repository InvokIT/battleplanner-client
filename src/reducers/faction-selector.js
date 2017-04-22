const initialState = {
    isOpen: false,
    playerId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "faction-selector_open":
            return {
                isOpen: true,
                playerId: action.playerId
            };
        case "faction-selector_close":
            return {
                isOpen: false,
                playerId: null
            };
        default:
            return state;
    }
};