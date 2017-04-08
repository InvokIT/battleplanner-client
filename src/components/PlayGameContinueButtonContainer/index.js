import React from "react";
import { connect } from 'react-redux';
import get from "lodash/fp/get";
import PlayGameContinueButton from "../PlayGameContinueButton";
import {continueAction} from "../../actions/match-lobby";

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const canContinue = (matchId) => (state) => {
    const currentRound = get(`matchLobby[${matchId}].state.data.currentRound`);
    if (currentRound > 1) {
        return false;
    }

    if (!isMatchOwner(matchId)(state)) {
        return false;
    };

    return true;
};

const mapStateToProps = (state, {matchId}) => {
    return {
        canContinue: canContinue(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onButtonClicked: () => dispatch(continueAction(matchId))
    };
};

const PlayGameContinueButtonContainer = connect(mapStateToProps, mapDispatchToProps)(PlayGameContinueButton);

PlayGameContinueButtonContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default PlayGameContinueButtonContainer;