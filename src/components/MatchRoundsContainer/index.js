import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import MatchRounds from "../MatchRounds";

const getRounds = (matchId) => flow(
    get(`matchLobbies.${matchId}.state.data.rounds`)
);

const mapStateToProps = (state, {matchId}) => {
    return {
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