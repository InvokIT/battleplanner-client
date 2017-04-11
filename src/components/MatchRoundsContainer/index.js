import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import find from "lodash/fp/find";
import head from "lodash/fp/head";
import MatchRounds from "../MatchRounds";
import {maps} from "../../config"

const getRounds = (matchId) => (state) => {
    const getTeamLeader = (teamNumber) => flow(
        get(`matchLobbies.${matchId}.teams[${teamNumber}]`),
        head,
        userId => get(`users[${userId}]`)(state)
    )(state);

    return flow(
        get(`matchLobbies[${matchId}].state.data.rounds`),
        map(r => ({
            map: find(m => m.id === r.map)(maps),
            winner: getTeamLeader(r.winner),
            winnerVictoryPoints: r.winnerVictoryPoints
        }))
    )(state);
};

const getCurrentRoundNumber = (matchId) => get(`matchLobbies[${matchId}].state.data.currentRound`);

const mapStateToProps = (state, {matchId}) => {
    return {
        currentRoundNumber: getCurrentRoundNumber(matchId)(state),
        rounds: getRounds(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {

    };
};

const MatchRoundsContainer = connect(mapStateToProps, mapDispatchToProps)(MatchRounds);

MatchRoundsContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default MatchRoundsContainer;