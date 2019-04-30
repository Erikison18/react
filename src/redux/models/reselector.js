// reduce-reducers 可以用于同时触发不同reduce
// import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

//一个假的异步
function request(){

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([1,2,3,4,5,6,7,8,9]);
        },3000)
    })

}

//第一步，申明action 传入的属性key就是action type，并导出action
/****重点：定义action type格式为filename_key，防止重复定义引起的不可预估的错误。使用时redux-action会将它转换成驼峰形式。*****/
export const actiontor = createActions({
    reselect_data:(payload) => request(),
});

//第二步，reducer 会被对应属性key的action 触发
const reselectData = handleActions({
    reselect_data: (state, action) => [...state , ...action.payload],
}, [1,9,6,3,5]);//默认值


//第三步，如果在该models里有多个reducer，那么用combineReducers 集合一下
export default reselectData;

