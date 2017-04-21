import React from "react";
import { connect } from 'react-redux';
import get from "lodash/fp/get";
import flow from "lodash/fp/flow";
import pick from "lodash/fp/pick";
import values from "lodash/fp/values";
import sortBy from "lodash/fp/sortBy";
import PlayerListButton from "../PlayerListButton";
import {togglePlayerList} from "../../actions/matches";

// const getMatchState = (matchId) => get(`matchLobbies.${matchId}.state.data`);

const getPlayers = (matchId) => (state) => {
    const playerIds = get(`matchLobbies.${matchId}.players`)(state);

    return flow(
        get("users"),
        pick(playerIds),
        values,
        sortBy("displayName")
    )(state);
};

const isListShown = get("playerListButton.isListShown");

const mapStateToProps = (state, {matchId}) => {
    return {
        players: getPlayers(matchId)(state),
        showList: isListShown(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onClick: () => dispatch(togglePlayerList(null)),
        onPlayerClick: () => dispatch(togglePlayerList(false))
    };
};

const PlayerListButtonContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerListButton);

PlayerListButtonContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default PlayerListButtonContainer;