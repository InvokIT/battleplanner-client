import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import defaultTo from "lodash/fp/defaultTo";
import isNil from "lodash/fp/isNil";
import eq from "lodash/fp/eq";
import CoinFlip from "../CoinFlip";
import {flipCoinAction, flipCoinAnimationEndAction, continueAction} from "../../actions/match-lobby"

const getFaces = (matchId) => (state) => flow(
    get(`matchLobbies.${matchId}.state.data.teams`),
    map(team => team[0]),
    map(playerId => {
        const player = get(`users.${playerId}`)(state);
        return {name: player.displayName, image: player.avatarUrl};
    })
)(state);

const getInitiator = (matchId) => flow(
    get(`matchLobbies.${matchId}.state.data.initiator`),
    defaultTo(null)
);

const isAnimating = (matchId) => flow(
    get(`matchLobbies.${matchId}.coinFlip.isAnimating`),
    defaultTo(false)
);

const isInitiatorSelected = (matchId) => flow(
    get(`matchLobbies.${matchId}.state.data.initiator`),
    isNil,
    eq(false)
);

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const canFlipCoin = (matchId) => (state) => {
    return isMatchOwner(matchId)(state) && !isAnimating(matchId)(state) && !isInitiatorSelected(matchId)(state);
};

const canContinue = (matchId) => (state) => {
    return isMatchOwner(matchId)(state) && !isAnimating(matchId)(state) && isInitiatorSelected(matchId)(state);
};

const mapStateToProps = (state, {matchId}) => {
    return {
        faces: getFaces(matchId)(state),
        canFlipCoin: canFlipCoin(matchId)(state),
        canContinue: canContinue(matchId)(state),
        winnerFaceIndex: getInitiator(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onFlipCoinButtonClick: (e) => dispatch(flipCoinAction(matchId)),
        onFlipCoinAnimationEnd: (e) => dispatch(flipCoinAnimationEndAction(matchId)),
        onContinueButtonClick: (e) => dispatch(continueAction(matchId))
    };
};

const CoinFlipContainer = connect(mapStateToProps, mapDispatchToProps)(CoinFlip);

CoinFlipContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default CoinFlipContainer;