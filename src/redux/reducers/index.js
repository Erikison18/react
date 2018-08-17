import {
    combineReducers
} from 'redux';

import {
    loadingBarReducer
} from 'react-redux-loading-bar'

import {
    demo1
} from './demo1.js';
import {
    asyncReducer
} from './async.js';

export default combineReducers({
    demo1,
    asyncReducer,
    loadingBar: loadingBarReducer
})