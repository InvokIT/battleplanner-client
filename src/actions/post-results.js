export const setVictoryPoints = (victoryPoints) => ({
    type: "post-results_set-victory-points",
    victoryPoints: victoryPoints
});

export const setWinner = (winnerTeam) => ({
    type: "post-results_set-winner",
    winnerTeam: winnerTeam
});