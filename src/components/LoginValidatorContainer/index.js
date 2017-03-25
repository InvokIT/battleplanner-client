import { connectWithLifecycle } from "react-lifecycle-component";
import LoginValidator from "../LoginValidator";
import { validate } from "../../controllers/auth-controller";

let authorized = false;

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        componentDidMount: validate(dispatch)
    };
};

const LoginValidatorContainer = connectWithLifecycle(mapStateToProps, mapDispatchToProps)(LogoutButton);

export default LoginValidatorContainer;