import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux';

import {
    loadingBarMiddleware
} from 'react-redux-loading-bar'
import {
    createLogger
} from 'redux-logger';
import {
    save,
    load
} from 'redux-localstorage-simple';

import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from '@middleware/reduxThunkPayload';
import filterActionType from '@middleware/filterActionType';

import {
    promiseTypeSuffixes,
    promiseTypeDelimiter,
    localstorageStates,
    reduxLoggerConfig
} from './config';

import * as reducers from './models';
// console.log(thunkMiddleware);

let rootReducer = combineReducers(reducers);

let applyMiddlewares = [
    thunkMiddleware,
    promiseMiddleware({
        promiseTypeSuffixes,
        promiseTypeDelimiter
    }),
    loadingBarMiddleware({
        promiseTypeSuffixes,
    }),
    createLogger(reduxLoggerConfig),
    filterActionType(),
    save({
        states: localstorageStates
    })
];

let composes = [applyMiddleware(...applyMiddlewares)];

const enhancer = compose(
    ...composes
);

export default (initialState = {}) => {

    let loadLocalstorage = load({
        states: localstorageStates
    });

    let mergeState = Object.assign({}, initialState, loadLocalstorage);

    let store = createStore(rootReducer, mergeState, enhancer);

    return store

}