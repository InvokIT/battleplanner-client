import { connect } from 'react-redux';
import flow from "lodash/fp/flow";
import defaultTo from "lodash/fp/defaultTo";
import get from "lodash/fp/get";
import CreateMatch from "../CreateMatch";
import { createMatch, createMatchNameChange } from "../../actions/matches";

const getMatchCreatorName = flow(
    get("matchCreator.name"),
    defaultTo("")
);

const isNameValid = (name) => name.length > 2;

const mapStateToProps = (state) => {
    const name = getMatchCreatorName(state);
    return {
        name,
        buttonDisabled: !isNameValid(name)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onNameChange: (e) => dispatch(createMatchNameChange(e.target.value)),
        onCreateMatch: (e) => {
            e.preventDefault();
            dispatch(createMatch());
        }
    };
};

const CreateMatchContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMatch);

export default CreateMatchContainer;