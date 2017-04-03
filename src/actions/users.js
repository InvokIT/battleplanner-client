import flow from "lodash/fp/flow";
import forEach from "lodash/fp/forEach";
import difference from "lodash/fp/difference";
import keys from "lodash/fp/keys";
import getUser from "../api/users"

const usersLoadedAction = (...users) => ({
    type: "users_loaded",
    users
});

export const loadUsers = (...userIds) => (dispatch, getState) => {
    const knownUserIds = keys(getState().users);

    flow(
        difference(knownUserIds),
        forEach(userId => async userId => {
            try {
                const user = await getUser(userId);
                dispatch(usersLoadedAction(user));
            } catch (err) {
                console.warn(`User ${userId} not found. ${err}`);
            }
        })
    )(userIds);
};