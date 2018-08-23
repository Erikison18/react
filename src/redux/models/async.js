import {
    createActions,
    handleActions
} from 'redux-actions';

/*
因为 redux-promise-middleware 做了action的类型处理，所以我们可以直接返回一个promise对象进行dispanth
并且 结合 react-redux-loading-bar 增加了加载进度
*/
export const actiontor = createActions({
    fetchDemo:() => fetch('/subitemSendHistory/messageToday')
})

export const reducer = handleActions({
    fetchDemo: (state, action) => Object.assign({}, state, action)
}, {})

/* 也可以利用 next throw处理错误,但不推荐这么做
export const reduce = handleAction('FETCH', {
    next: (state, action) => Object.assign({}, state, action),
    throw: (state, action) => Object.assign({}, state, action)
}, {});
*/
