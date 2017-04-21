import isNil from "lodash/fp/isNil";

const initialState = {
    isListShown: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "player-list-button_toggle-list":
            return {
                isListShown: isNil(action.visible) ? !state.isListShown : action.visible
            };
        default:
            return state;
    }
};