// @flow

import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import defaultTo from "lodash/fp/defaultTo";
import find from "lodash/fp/find";
import findIndex from "lodash/fp/findIndex";
import includes from "lodash/fp/includes";
import isNil from "lodash/fp/isNil";
import Team from "../Team";
import {factions} from "../../config";
import {factionSelectorOpenAction} from "../../actions/match-lobby";

const getTeam = (matchId, teamIndex) => (state) => {
    const matchState = get(`matchLobbies.${matchId}.state.data`)(state);
    const currentRound = get("currentRound")(matchState);

    const players = flow(
        get(`teams[${teamIndex}]`),
        map(playerId => get(`users.${playerId}`)(state)),
        map(player => {
            // map to an object with player and faction

            let factionId;

            if (isNil(player)) {
                factionId = "missing";
            } else {
                factionId = flow(
                    get(`rounds[${currentRound}].factions[${player.id}]`),
                    defaultTo("missing")
                )(matchState);
            }

            const faction = find(faction => faction.id === factionId, factions);

            return {
                player: player,
                faction: faction
            };
        })
    )(matchState);

    return players;
};

const canSelectFaction = (matchId, teamIndex) => (state) => {
    const allowedStates = ["select-faction", "select-map-or-faction"];

    const currentTeam: number = get(`matchLobbies.${matchId}.state.data.currentTeam`)(state);
    const currentUserId: string = get("auth.user.id")(state);
    const currentStateName: string = get(`matchLobbies.${matchId}.state.name`)(state);
    const teamOfUser = flow(
        get(`matchLobbies.${matchId}.state.data.teams`),
        findIndex(t => includes(currentUserId, t))
    )(state);

    return teamOfUser === teamIndex && currentTeam === teamOfUser && includes(currentStateName, allowedStates);
};

const mapStateToProps = (state, {matchId, teamIndex}) => {
    return {
        team: getTeam(matchId, teamIndex)(state),
        teamIndex: teamIndex,
        canSelectFaction: canSelectFaction(matchId, teamIndex)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId, teamIndex}) => {
    return {
        onSelectFactionClick: () => dispatch(factionSelectorOpenAction())
    };
};

const TeamContainer = connect(mapStateToProps, mapDispatchToProps)(Team);

TeamContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired,
    teamIndex: React.PropTypes.number.isRequired
};

export default TeamContainer;