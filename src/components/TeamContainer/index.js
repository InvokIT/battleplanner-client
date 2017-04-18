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
import {factions, maps} from "../../config";
import {factionSelectorOpenAction} from "../../actions/match-lobby";

const getMatchState = (matchId) => get(`matchLobbies.${matchId}.state.data`);

const getTeamSide = (matchId, teamIndex) => (state): string => {
    const matchState: object = getMatchState(matchId)(state);
    const currentRound: number = get("currentRound")(matchState);

    // Get the first player on the team
    const playerId = flow(
        get(`teams[${teamIndex}]`),
        find(p => !isNil(p))
    )(matchState);

    // Get that players faction and side
    const factionId = get(`rounds[${currentRound}].factions[${playerId}]`)(matchState);
    const side = flow(
        find(f => f.id === factionId),
        get("side")
    )(factions);

    return side;
};

const getTeam = (matchId, teamIndex) => (state): Array<{ player: object, faction: object }> => {
    const matchState: object = getMatchState(matchId)(state);
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

const canSelectFaction = (matchId, teamIndex) => (state): boolean => {
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

const getStartingPositions = (matchId, teamIndex) => (state): ?Array<number> => {
    const matchState: object = getMatchState(matchId)(state);
    const currentRound: number = get("currentRound")(matchState);
    const mapId: string = get(`rounds[${currentRound}].map`)(matchState);
    const teamSide = getTeamSide(matchId, teamIndex)(state);
    const startingPositions: ?Array<number> = flow(
        find(m => m.id === mapId),
        get(`startingPositions.${teamSide}`)
    )(maps);

    return startingPositions;
};

const mapStateToProps = (state, {matchId, teamIndex}) => {
    return {
        team: getTeam(matchId, teamIndex)(state),
        teamIndex: teamIndex,
        canSelectFaction: canSelectFaction(matchId, teamIndex)(state),
        startingPositions: getStartingPositions(matchId, teamIndex)(state)
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