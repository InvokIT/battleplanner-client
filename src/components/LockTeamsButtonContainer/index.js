import React from "react";
import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import flatten from "lodash/fp/flatten";
import every from "lodash/fp/every";
import isNil from "lodash/fp/isNil";
import LockTeamsButton from "../LockTeamsButton";
import {lockTeams} from "../../actions/match-lobby";

const isMatchOwner = (matchId) => (state) => {
    const currentUserId = get("auth.user.id")(state);
    const matchOwnerId = get(`matches.${matchId}.owner`)(state);

    return currentUserId === matchOwnerId;
};

const canLockTeams = (matchId) => (state) => {
    if (!isMatchOwner(matchId)(state)) {
        return false;
    }

    const teamsFull = flow(
        get(`matchLobbies.${matchId}.state.data.teams`),
        flatten,
        every(v => !isNil(v))
    )(state);

    return teamsFull;
};

const mapStateToProps = (state, {matchId}) => {
    return {
        canLock: canLockTeams(matchId)(state)
    };
};

const mapDispatchToProps = (dispatch, {matchId}) => {
    return {
        onButtonClicked: () => dispatch(lockTeams(matchId))
    };
};

const LockTeamsButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LockTeamsButton);

LockTeamsButtonContainer.propTypes = {
    matchId: React.PropTypes.string.isRequired
};

export default LockTeamsButtonContainer;