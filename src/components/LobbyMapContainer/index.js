// @flow
import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import find from "lodash/fp/find";
import findIndex from "lodash/fp/findIndex";
import includes from "lodash/fp/includes";
import LobbyMap from "../LobbyMap";
import {maps} from "../../config";

const getMap = (matchId) => (state) => {
    const currentRound = get(`matchLobbies.${matchId}.state.data.currentRound`)(state);
    const mapId = get(`matchLobbies.${matchId}.state.data.rounds[${currentRound}].map`)(state);
    const map = find(m => m.id === mapId)(maps);

    return map;
};

const canSelectMap = (matchId) => (state) => {
    const allowedStates = ["select-map", "select-map-or-faction"];

    const currentTeam: ?number = get(`matchLobbies.${matchId}.state.data.currentTeam`)(state);
    const currentUserId: ?string = get("auth.user.id")(state);
    const currentStateName: ?string = get(`matchLobbies.${matchId}.state.name`)(state);
    const teamOfUser = flow(
        get(`matchLobbies.${matchId}.state.data.teams`),
        findIndex(t => includes(currentUserId, t))
    )(state);

    return includes(currentStateName, allowedStates) && currentTeam === teamOfUser;
};

const mapStateToProps = (state, {matchId}) => {
    return {
        scenario: getMap(matchId)(state),
        canSelectMap: canSelectMap(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onSelectMapClick: (e) => console.log("select map clicked")
    };
};

const CoinFlipContainer = connect(mapStateToProps, mapDispatchToProps)(LobbyMap);

CoinFlipContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default CoinFlipContainer;