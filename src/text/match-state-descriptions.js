import get from "lodash/fp/get";

export default {
    "assign-players-to-teams": (player) => "Assign players to teams",
    "choose-initiator": (player) => "Toss the coin!",
    "play-game": (player) => "Play the game!",
    "post-result-and-replays": (player) => "Post replays and match results",
    "select-faction": (player) => `It is ${get("displayName", player)}'s turn to select faction`,
    "select-map": (player) => `It is ${get("displayName", player)}'s turn to select map`,
    "select-map-or-faction": (player) => `It is ${get("displayName", player)}'s turn to select map or faction`
};