export default {
    get() {
        const jwt = window.localStorage.getItem("jwt");
        return jwt === "null" ? null : jwt;
    },

    set(jwt) {
        if (jwt) {
            window.localStorage.setItem("jwt", jwt);
        } else {
            window.localStorage.removeItem("jwt");
        }
    }
};