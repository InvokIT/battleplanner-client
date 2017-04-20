import get from "lodash/fp/get";

export default {
    "assign-players-to-teams": (player) => "Join your teams",
    "choose-initiator": (player) => "Who picks first?",
    "play-game": (player) => "Play the game!",
    "post-result-and-replays": (player) => "Waiting for match results",
    "select-faction": (player) => `It is ${get("displayName", player)}'s turn to select faction`,
    "select-map": (player) => `It is ${get("displayName", player)}'s turn to select map`,
    "select-map-or-faction": (player) => `It is ${get("displayName", player)}'s turn to select map OR faction`
};