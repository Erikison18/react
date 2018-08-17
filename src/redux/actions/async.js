import {
    createAction
} from 'redux-actions';

export const FETCH = 'FETCH';

export const asyncAction = createAction(
    FETCH,
    () => fetch('/subitemSendHistory/messageToday')
    .then((res) => res.json()),
    // .then(() => {
    //     throw new Error('错了就是错了');
    // })

)