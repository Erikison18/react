function createThunkMiddleware(extraArgument) {
  return function ({dispatch,getState}) {
    return function (next) {
      return function (action) {
        if (typeof action.payload === 'function') {
          return next({
            payload:action.payload(dispatch, getState, extraArgument),
            type:action.type
          })
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;