import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './components/AppContainer';
import './index.css';
import * as reducers from "./reducers";
import authValidate from "./actions/auth-validate";

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

const renderUi = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        document.getElementById('root')
    );
};

store.dispatch(authValidate()).then(renderUi);