import {
    createActions,
    handleActions
} from 'redux-actions';

/*
因为 redux-promise-middleware 做了action的类型处理，所以我们可以直接返回一个promise对象进行dispanth
并且 结合 react-redux-loading-bar 增加了加载进度
*/

/****重点：定义action type格式为filename_key，防止重复定义引起的不可预估的错误。使用时redux-action会将它转换成驼峰形式。*****/
export const actiontor = createActions({
    ASYNC_FETCH_DEMO:() => fetch('/subitemSendHistory/messageToday')
})

export default handleActions({
    ASYNC_FETCH_DEMO: (state, action) => Object.assign({}, state, action)
}, {})

/* 也可以利用 next throw处理错误,但不推荐这么做
export const reduce = handleAction('FETCH', {
    next: (state, action) => Object.assign({}, state, action),
    throw: (state, action) => Object.assign({}, state, action)
}, {});
*/
