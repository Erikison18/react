import { createDuck } from 'redux-duck';

const myDuck = createDuck('duck-name', 'application-name');//'duck-name', 'application-name'
// console.log(myDuck);
const ACTION_TYPE = myDuck.defineType('ACTION_TYPE');
export const actionType = myDuck.createAction(ACTION_TYPE);
console.log(actionType)
const initialState = {
  list: [],
  data: {},
};

const reducer = myDuck.createReducer({
  [ACTION_TYPE]: (state, action) => ({
    ...state,
    list: state.list.push(action.payload.id),
    data: state.map.set(action.payload.id+'', action.payload),
  }),
}, initialState);


export default reducer;
console.log(reducer)