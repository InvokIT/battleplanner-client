import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import defaultTo from "lodash/fp/defaultTo";
import get from "lodash/fp/get";
import CreateMatch from "../CreateMatch";
import {
    createMatch,
    createMatchNameChange,
    createMatchRoundCountChange,
    createMatchPlayerCountChange
} from "../../actions/matches";

const getMatchCreatorName = flow(
    get("matchCreator.name"),
    defaultTo("")
);

const getSelectedRoundCount = flow(
    get("matchCreator.roundCount"),
    defaultTo(5)
);

const getSelectedPlayerCount = flow(
    get("matchCreator.playerCount"),
    defaultTo("1v1")
);

const isNameValid = (name) => true;//name.length > 2;

const mapStateToProps = (state) => {
    const name = getMatchCreatorName(state);
    return {
        name,
        buttonDisabled: !isNameValid(name),
        roundCounts: [3, 5, 7],
        selectedRoundCount: getSelectedRoundCount(state),
        playerCounts: ["1v1", "2v2"],
        selectedPlayerCount: getSelectedPlayerCount(state)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNameChange: (e) => dispatch(createMatchNameChange(e.target.value)),
        onSelectedRoundCountChange: (roundCount) => dispatch(createMatchRoundCountChange(roundCount)),
        onSelectedPlayerCountChange: (playerCount) => dispatch(createMatchPlayerCountChange(playerCount)),
        onCreateMatch: (e) => {
            e.preventDefault();
            dispatch(createMatch());
        }
    };
};

const CreateMatchContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMatch);

export default CreateMatchContainer;