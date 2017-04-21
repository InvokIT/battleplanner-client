import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import includes from "lodash/fp/includes";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import isNil from "lodash/fp/isNil";
import PostResults from "../PostResults";
import {setResultAction} from "../../actions/match-lobby";
import {setVictoryPoints, setWinner} from "../../actions/post-results";

const isMatchAdmin = flow(
    get("auth.user.roles"),
    includes("matchAdmin")
);

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const getMatchState = (matchId) => get(`matchLobbies.${matchId}.state.data`);

const currentRoundHasResults = (matchId) => (state) => {
    const matchState = getMatchState(matchId);
    const currentRound = get("currentRound")(matchState);
    const winnerTeam = get(`rounds[${currentRound}].winner`)(matchState);

    return !isNil(winnerTeam);
};

const canPostResults = (matchId) => (state) => {
    return !currentRoundHasResults(matchId)(state) && (isMatchAdmin(state) || isMatchOwner(matchId)(state));
};

const getVictoryPoints = get("postResults.victoryPoints");

const getPlayer = (playerId) => get(`users.${playerId}`);

const getTeams = (matchId) => (state) => {
    return flow(
        getMatchState(matchId),
        get("teams"),
        map(t => map(pId => getPlayer(pId)(state))(t))
    )(state);
};

const getSelectedTeam = (state) => {
    const team = get(`postResults.winnerTeam`)(state);

    return team;
};

const canContinue = (state) => {
    return !isNil(getSelectedTeam(state));
};

const isLastRound = (matchId) => (state) => {
    const matchState = getMatchState(matchId);
    const currentRound = get("currentRound")(matchState);
    const roundCount = get("rounds").length;

    return currentRound === roundCount - 1;
};

const mapStateToProps = (state, {matchId}) => {
    return {
        canPostResults: canPostResults(matchId)(state),
        canContinue: canContinue(state),
        victoryPoints: getVictoryPoints(state),
        teams: getTeams(matchId)(state),
        selectedTeam: getSelectedTeam(state),
        hideVictoryPoints: isLastRound(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onWinnerSelected: team => dispatch(setWinner(team)),
        onVictoryPointsChange: vps => dispatch(setVictoryPoints(vps)),
        onContinueClick: (winnerTeam, winnerVictoryPoints) => dispatch(setResultAction(matchId, winnerTeam, winnerVictoryPoints))
    };
};

const PostResultsContainer = connect(mapStateToProps, mapDispatchToProps)(PostResults);

PostResultsContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default PostResultsContainer;