import { connect } from 'react-redux';
import CreateMatch from "../CreateMatch";
import { matchesController } from "../../controllers";
import matchCreatorTitleChangeAction from "../../actions/match-creator-title-change";

const mapStateToProps = (state) => {
    return {
        title: state.matchCreator.title
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const onCreateMatch = matchesController.createMatch(dispatch);

    return {
        onTitleInput: (e) => dispatch(matchCreatorTitleChangeAction({title: e.target.value})),
        onCreateMatch: (e) => {
            e.preventDefault();
            onCreateMatch(ownProps.title);
        }
    };
};

const CreateMatchContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMatch);

export default CreateMatchContainer;