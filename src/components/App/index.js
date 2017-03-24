import React from 'react';
import './App.css';
import CreateMatchButtonContainer from "../CreateMatchButtonContainer";
import MatchListContainer from "../MatchListContainer";

const App = ({user}) => {
    return (
        <div className="app">
            <CreateMatchButtonContainer/>
            <MatchListContainer/>
        </div>
    );
};

App.propTypes = {
};

export default App;
