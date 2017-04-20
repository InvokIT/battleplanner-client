import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import includes from "lodash/fp/includes";
import get from "lodash/fp/get";
import PlayGameContinueButton from "../PlayGameContinueButton";
import {continueAction} from "../../actions/match-lobby";

const isMatchAdmin = flow(
    get("auth.user.roles"),
    includes("matchAdmin")
);

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const canContinue = (matchId) => (state) => {
    return isMatchAdmin(state) || isMatchOwner(matchId)(state);
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