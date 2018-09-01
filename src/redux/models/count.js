import {
    createActions,
    handleActions,
    // combineActions
} from 'redux-actions';

//申明actiontor 传入的属性key就是action type
/****重点：定义action type格式为filename_key，防止重复定义引起的不可预估的错误。使用时redux-action会将它转换成驼峰形式。*****/
export const actiontor = createActions({
    COUNT_INCREMENT: (payload) => payload,
    COUNT_DECREMENT: (payload) => -payload,
    COUNT_MULTIPLY: (payload) => payload
});

//申明reduce 传入的属性key就是action type对应起来，就是每次dispanth action type 所对应的操作
export default handleActions({
    COUNT_INCREMENT: (state, action) => state + action.payload,
    COUNT_DECREMENT: (state, action) => state + action.payload,
    COUNT_MULTIPLY: (state, action) => state * action.payload
}, 0);//默认值

/* 利用combineActions合并相同的handleActions操作,可以打印出看出其实是返回了一个increment||decrement的字符串
let {increment,decrement} = actiontor;
let crement = combineActions(increment,decrement);
export const reduce = handleActions({
    [crement]: (state, action) => state + action.payload,
    multiply: (state, action) => state * action.payload
}, 0);
*/