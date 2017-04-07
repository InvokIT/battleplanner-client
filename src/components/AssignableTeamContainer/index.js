import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import remove from "lodash/fp/remove";
import isNil from "lodash/fp/isNil";
import AssignableTeam from "../AssignableTeam";
import {assignPlayerToTeam} from "../../actions/match-lobby";

const getTeam = (matchId, teamIndex) => (state) =>
    flow(
        get(`matchLobbies.${matchId}.state.data.teams[${teamIndex}]`),
        map(playerId => get(`users.${playerId}`)(state))
    )(state);

const getPlayers = (matchId) => (state) =>
    flow(
        get(`matchLobbies.${matchId}.players`),
        map(playerId => get(`users.${playerId}`)(state)),
        remove(isNil)
    )(state);

const mapStateToProps = (state, {matchId, teamIndex}) => {
    return {
        team: getTeam(matchId, teamIndex)(state),
        players: getPlayers(matchId)(state),
        teamIndex: teamIndex
    };
};

const mapDispatchToProps = (dispatch, {matchId, teamIndex}) => {
    return {
        onPlayerSelected: (teamSlot, playerId) => dispatch(assignPlayerToTeam(matchId, playerId, teamIndex, teamSlot))
    };
};

const AssignableTeamContainer = connect(mapStateToProps, mapDispatchToProps)(AssignableTeam);

AssignableTeamContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    teamIndex: React.PropTypes.number.isRequired
};

export default AssignableTeamContainer;