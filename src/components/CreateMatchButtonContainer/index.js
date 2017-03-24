import { connect } from 'react-redux';
import CreateMatchButton from "../CreateMatchButton";
import { createMatch } from "../../controllers/matches";

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: createMatch(dispatch)
    };
};

const CreateMatchButtonContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMatchButton);

export default CreateMatchButtonContainer;