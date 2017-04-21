import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import remove from "lodash/fp/remove";
import isNil from "lodash/fp/isNil";
import includes from "lodash/fp/includes";
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

const isMatchAdmin = flow(
    get("auth.user.roles"),
    includes("matchAdmin")
);

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const canAssignPlayers = (matchId) => (state) => {
    return isMatchAdmin(state) || isMatchOwner(matchId)(state);
};

const mapStateToProps = (state, {matchId, teamIndex}) => {
    return {
        team: getTeam(matchId, teamIndex)(state),
        players: getPlayers(matchId)(state),
        teamIndex: teamIndex,
        canAssignPlayers: canAssignPlayers(matchId)(state)
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