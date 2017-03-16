import React from 'react';
import './App.css';
import LoginContainer from "../LoginContainer";
import Header from "../Header";

const App = ({loggedIn, userDisplayName, userAvatarUrl, userIsAdmin}) => {
    let ui;

    if (loggedIn) {
        ui = <div>Match UI</div> //<MatchContainer />;
    } else {
        ui = <LoginContainer />;
    }

    let adminUi = null;
    if (userIsAdmin) {
        adminUi = <div>Admin UI</div>
    };

    return (
        <div className="app">
            <Header userDisplayName={userDisplayName} userAvatarUrl={userAvatarUrl} />
            <div className="app__content">
                {ui}
                {adminUi}
            </div>
        </div>
    );
};

App.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    userDisplayName: React.PropTypes.string,
    userAvatarUrl: React.PropTypes.string,
    userIsAdmin: React.PropTypes.bool
};

export default App;
