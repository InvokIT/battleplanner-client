import React from "react";
import { connect } from 'react-redux';
import get from "lodash/fp/get";
import FactionSelector from "../FactionSelector";
import {getSelectableFactions} from "../../config";
import {selectFactionAction, factionSelectorCloseAction} from "../../actions/match-lobby";

const isVisible = get("factionSelector.isOpen");

const getPlayerId = get("factionSelector.playerId");

const getFactions = (matchId) => (state) => {
    const lobby = get(`matchLobbies.${matchId}`)(state);
    const playerId = getPlayerId(state);

    return getSelectableFactions(lobby, playerId);
};

const mapStateToProps = (state, {matchId}) => {
    const playerId = getPlayerId(state);

    return {
        isVisible: isVisible(state),
        factions: getFactions(matchId)(state),
        playerId: playerId
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onFactionSelected: (playerId, faction) => dispatch(selectFactionAction(matchId, playerId, faction)),
        onCancelClick: () => dispatch(factionSelectorCloseAction())
    };
};

const FactionSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(FactionSelector);

FactionSelectorContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default FactionSelectorContainer;