import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import { Redirect } from "react-router";
import * as reducers from "./reducers";
import HeaderContainer from "./components/HeaderContainer";
import Footer from "./components/Footer";
import { validate as validateAuth } from "./actions/auth";
import LoginContainer from "./components/LoginContainer";
import MatchBrowserContainer from "./components/MatchBrowserContainer";
import MatchLobbyContainer from "./components/MatchLobbyContainer";

const history = createHistory();

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(
        routerMiddleware(history),
        thunk
    )
);

const renderUi = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div className="app-root">
                    <HeaderContainer />
                    <Route exact path="/" render={() =>
                        <Redirect to="/matches"/>
                    } />
                    <Route exact path="/matches" component={MatchBrowserContainer} />
                    <Route path="/matches/:matchId" component={MatchLobbyContainer} />
                    <Route path="/login" component={LoginContainer}/>
                    <Footer/>
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
};

store.dispatch(validateAuth()).then(renderUi);

