import flow from "lodash/fp/flow";
import cloneDeep from "lodash/fp/cloneDeep";
import assign from "lodash/fp/assign";
import keyBy from "lodash/fp/keyBy";
import get from "lodash/fp/get";

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case "users_loaded":
            const users = action.users;
            return flow(
                cloneDeep,
                assign(keyBy(get("id"))(users))
            )(state);
        default:
            return state;
    }
};