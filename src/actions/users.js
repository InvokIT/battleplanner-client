// @flow
//import flow from "lodash/fp/flow";
import forEach from "lodash/fp/forEach";
import without from "lodash/fp/without";
import keys from "lodash/fp/keys";
import isNil from "lodash/fp/isNil";
import getUser from "../api/users"

const usersLoadedAction = (...users) => ({
    type: "users_loaded",
    users
});

export const loadUsers = (...userIds: Array<string>) => (dispatch: (any) => void, getState: () => Object) => {
    const knownUserIds = keys(getState().users);
    const userIdsToGet = without(knownUserIds)(userIds);

    forEach(async userId => {
        try {
            if (isNil(userId)) {
                return;
            }

            const user = await getUser(userId);
            dispatch(usersLoadedAction(user));
        } catch (err) {
            console.error(`User ${userId} not found. ${err}`);
        }
    })(userIdsToGet);
};