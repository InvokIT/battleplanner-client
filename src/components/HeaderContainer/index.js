import { connect } from 'react-redux';
import Header from "../Header";
import { logout } from "../../controllers/auth";

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: logout(dispatch)
    };
};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;