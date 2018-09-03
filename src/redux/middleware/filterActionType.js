/*author dengsw
 *description 处理掉redux-promise-middleware 带来的action type fulfilled状态拼接
 */

import {
    promiseTypeSuffixes,
    promiseTypeDelimiter
} from '@redux/config';

let FULFILLED = promiseTypeSuffixes[1];
let REJECTED = promiseTypeSuffixes[2]

const reg = new RegExp(`${promiseTypeDelimiter.replace(/([\s\S])/g,'\\$1')}(${FULFILLED.replace(/([\s\S])/g,'\\$1')}|${REJECTED.replace(/([\s\S])/g,'\\$1')})$`);

export default function filterActionType(config) {
    return (store) => (next) => (action) => {

        let newType = action.type.replace(reg, '');
        let newAction = Object.assign({}, action, {
            type: newType
        })

        return next(newAction)
    }
}