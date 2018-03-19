import get from "lodash/fp/get";

export default {
    "assign-players-to-teams": (teamId) => "Join your teams",
    "choose-initiator": (teamId) => "Who picks first?",
    "play-game": (teamId) => "Play the game!",
    "post-result-and-replays": (teamId) => "Waiting for match results",
    "select-faction": (teamId) => `It is Team ${teamId + 1}'s turn to select faction`,
    "select-map": (teamId) => `It is Team ${teamId + 1}'s turn to select map`,
    "select-map-or-faction": (teamId) => `It is Team ${teamId + 1}'s turn to select map OR faction`
};