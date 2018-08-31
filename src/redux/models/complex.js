// reduce-reducers 可以用于同时触发不同reduce
// import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import { createActions, handleActions } from 'redux-actions';

//一个假的异步
function request(num=1){

    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(num);
        },1000)
    })

}

//第一步，申明action 传入的属性key就是action type，并导出action
export const actiontor = createActions({
    add(payload){
        return function (dispatch){
            dispatch(actiontor.loadingStatus(true));
            return request(payload)
                .then((res)=>{
                    dispatch(actiontor.loadingStatus(false));
                    return res
                })
        }
    },
    reduce:(payload) => request(-payload),
    loadingStatus:(payload) => payload
});

console.log(actiontor.add(123));

//第二步，reducer 会被对应属性key的action 触发
const counts = handleActions({
    add: (state, action) => state + action.payload,
    reduce: (state, action) => state + action.payload
}, 0);//默认值

const loading = handleActions({
    loadingStatus: (state, action) => action.payload
}, false);

//第三步，如果在该models里有多个reducer，那么用combineReducers 集合一下
export default combineReducers({
    counts,
    loading
});

/*
 *我们的redux编码风格用 ducks-modular-redux 提议 结合redux-actions的拓展 https://github.com/erikras/ducks-modular-redux
 *1、一个功能相关action和reducer统一到models里
 *2、actiontor通过export导出
 *3、reducer通过export default导出
 */