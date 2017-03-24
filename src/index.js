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
import authValidate from "./actions/auth-validate";
import HeaderContainer from "./components/HeaderContainer";
import App from "./components/App";
import LoginContainer from "./components/LoginContainer";

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
                    <Route path="/" component={App} exact={}/>
                    <Route path="/login" component={LoginContainer}/>
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
};

store.dispatch(authValidate()).then(renderUi);