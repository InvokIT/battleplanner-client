import qs from "query-string";

const readFromQueryString = () => qs.parse(location.search).match || null;

export default (state = readFromQueryString(), action) => {
    switch (action.type) {
        case "matchid_update":
            return action.matchId;
        default:
            return state;
    }
};