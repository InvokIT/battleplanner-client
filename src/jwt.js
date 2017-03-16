export default {
    get() {
        return window.localStorage.getItem("jwt");
    },

    set(jwt) {
        window.localStorage.setItem("jwt", jwt);
    }
};