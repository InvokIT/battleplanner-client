import authStages from "../auth-stages";

const initialState = {
    stage: authStages.notAuthorized,
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "auth_begin":
            return {
                ...state,
                ...{stage: authStages.authorizing}
            };
        case "auth_finish":
            const user = action.user;
            return {
                ...state,
                ...{
                    stage: user ? authStages.authorized : authStages.notAuthorized,
                    user: user
                }
            };
        default:
            return state;
    }
};