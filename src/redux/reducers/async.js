// import {
//     FETCH
// } from '@actions/async.js';

import {
    createAction,
    handleAction,
    handleActions
} from 'redux-actions';

let FETCH = createAction('FETCH');

export const asyncReducer = handleActions({
    [FETCH]: (state, action) => Object.assign({}, state, action)
    // xxxxx:(state, action) => Object.assign({}, state, action,{a:1,b:2})
}, {})

// export const asyncReducer = handleAction(FETCH, {
//     next: (state, action) => Object.assign({}, state, action),
//     throw: (state, action) => {
//         // console.log(12312312312);
//         return Object.assign({}, state, action)
//     }
// }, {});