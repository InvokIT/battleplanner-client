import { get } from "../";
export default (id) => {
    if (id === undefined) {
        return get("/matches")
    } else {
        return get(`/matches/${id}`);
    }

}