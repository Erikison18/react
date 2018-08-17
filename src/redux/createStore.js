import {
    createStore,
    applyMiddleware,
    compose
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
import filterActionType from '@middleware/filterActionType';

import {
    promiseTypeSuffixes,
    promiseTypeDelimiter,
    localstorageStates
} from './config';

import rootReducer from './reducers';

let applyMiddlewares = [
    promiseMiddleware({
        promiseTypeSuffixes,
        promiseTypeDelimiter
    }),
    loadingBarMiddleware({
        promiseTypeSuffixes
    }),
    createLogger(),
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