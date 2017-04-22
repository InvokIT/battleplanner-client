import React from "react";
import { connect } from 'react-redux';
import get from "lodash/fp/get";
import MapSelector from "../MapSelector";
import {getSelectableMaps} from "../../config";
import {selectMapAction, mapSelectorCloseAction} from "../../actions/match-lobby";

const isVisible = get("mapSelector.isOpen");

const getMaps = (matchId) => (state) => {
    const matchState = get(`matchLobbies.${matchId}.state.data`)(state);
    const userId = get("auth.user.id")(state);

    return getSelectableMaps(matchState, userId);
};

const mapStateToProps = (state, {matchId}) => {
    return {
        isVisible: isVisible(state),
        maps: getMaps(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onMapSelected: (faction) => dispatch(selectMapAction(matchId, faction)),
        onCancelClick: () => dispatch(mapSelectorCloseAction())
    };
};

const MapSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(MapSelector);

MapSelectorContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default MapSelectorContainer;