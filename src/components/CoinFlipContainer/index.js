import React from "react";
import {connect} from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import CoinFlip from "../CoinFlip";

const getFaces = (matchId) => (state) => flow(
    get(`matchLobbies.${matchId}.state.data.teams`),
    map(team => team[0]),
    map(playerId => {
        const player = get(`users.${playerId}`)(state);
        return {name: player.displayName, image: player.avatarUrl};
    })
)(state);

const getResult = (matchId) => get(`matchLobbies.${matchId}.state.data.initiator`);

const mapStateToProps = (state, {matchId}) => {
    return {
        faces: getFaces(matchId)(state),
        result: getResult(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onFlipCoinButtonClick: (e) => console.log("Coin flip!")
    };
};

const CoinFlipContainer = connect(mapStateToProps, mapDispatchToProps)(CoinFlip);

CoinFlipContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default CoinFlipContainer;