import { connect } from 'react-redux';
import get from "lodash/fp/get";
import isEmpty from "lodash/fp/isEmpty";
import CreateMatch from "../CreateMatch";
import { createMatch, createMatchNameChange } from "../../actions/matches";

const mapStateToProps = (state) => {
    const name = get("matchCreator.name", state);
    return {
        name,
        buttonDisabled: isEmpty(name)
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