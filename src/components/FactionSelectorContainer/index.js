import React from "react";
import { connect } from 'react-redux';
import get from "lodash/fp/get";
import FactionSelector from "../FactionSelector";
import {getSelectableFactions} from "../../config";
import {selectFactionAction, factionSelectorCloseAction} from "../../actions/match-lobby";

const isVisible = get("factionSelector.isOpen");

const getFactions = (matchId) => (state) => {
    const lobby = get(`matchLobbies.${matchId}`)(state);
    const userId = get("auth.user.id")(state);

    return getSelectableFactions(lobby, userId);
};

const mapStateToProps = (state, {matchId}) => {
    return {
        isVisible: isVisible(state),
        factions: getFactions(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onFactionSelected: (faction) => dispatch(selectFactionAction(matchId, faction)),
        onCancelClick: () => dispatch(factionSelectorCloseAction())
    };
};

const FactionSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(FactionSelector);

FactionSelectorContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default FactionSelectorContainer;