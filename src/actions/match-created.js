export default ({error, match}) => ({
    type: "match_created",
    match,
    error
});
