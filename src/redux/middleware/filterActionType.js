/*author dengsw
 *description 处理掉redux-promise-middleware 带来的action type状态拼接
 */

import {
    promiseTypeSuffixes,
    promiseTypeDelimiter
} from '@redux/config';

let [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes;

const reg = new RegExp(`${promiseTypeDelimiter.replace(/([\s\S])/g,'\\$1')}(${PENDING.replace(/([\s\S])/g,'\\$1')}|${FULFILLED.replace(/([\s\S])/g,'\\$1')}|${REJECTED.replace(/([\s\S])/g,'\\$1')})$`);

export default function filterActionType(config) {
    return (store) => (next) => (action) => {

        let newType = action.type.replace(reg, '');
        let newAction = Object.assign({}, action, {
            type: newType
        })

        return next(newAction)
    }
}