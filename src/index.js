import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import './index.css';
import * as reducers from "./reducers";
import HeaderContainer from "./components/HeaderContainer";
import { validate as validateAuth } from "./actions/auth";
import LoginContainer from "./components/LoginContainer";
import MatchBrowser from "./components/MatchBrowser";

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
                <div>
                    <HeaderContainer />
                    <Route exact path="/matches" component={MatchBrowser} />
                    {/*<Route path="/matches/:matchId" component={MatchBrowser} />*/}
                    <Route path="/login" component={LoginContainer}/>
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
};

store.dispatch(validateAuth()).then(renderUi);