import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import includes from "lodash/fp/includes";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import head from "lodash/fp/head";
import maxBy from "lodash/fp/maxBy";
import isNil from "lodash/fp/isNil";
import MatchOver from "../MatchOver";

const getMatchState = (matchId) => get(`matchLobbies.${matchId}.state.data`);

const isMatchAdmin = flow(
    get("auth.user.roles"),
    includes("matchAdmin")
);

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const getWinner = matchId => state => {
    const matchState = getMatchState(matchId)(state);
    const winnerTeam = flow(
        get("rounds"),
        reduce((scores, round) => {
            if (!isNil(round.winner)) {
                scores[round.winner].wins += 1;
            }

            return scores;
        }, [{team:0, wins:0}, {team:1, wins:0}]),
        maxBy("wins"),
        get("team")
    )(matchState);

    const winnerPlayerId = flow(
        get(`teams[${winnerTeam}]`),
        head
    )(matchState);

    const winnerPlayer = get(`users.${winnerPlayerId}`)(state);

    return winnerPlayer;
};

const showCreateMatch = (matchId) => (state) => {
    return isMatchAdmin(state) || isMatchOwner(matchId)(state);
};

const mapStateToProps = (state, {matchId}) => {
    return {
        winner: getWinner(matchId)(state),
        showCreateMatch: showCreateMatch(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {

    };
};

const MatchOverContainer = connect(mapStateToProps, mapDispatchToProps)(MatchOver);

MatchOverContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default MatchOverContainer;