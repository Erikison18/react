import localstorageStatesConfig from './localstorageStatesConfig.js'

export const promiseTypeSuffixes = ['PENDING##', 'FULFILLED##', 'REJECTED##'];
export const promiseTypeDelimiter = '$$';
export const localstorageStates = localstorageStatesConfig;
export const reduxLoggerConfig = {
    predicate: (getState, action) => (action.type !== 'loading-bar/SHOW' && action.type !== 'loading-bar/HIDE'),
    collapsed: (getState, action, logEntry) => !logEntry.error
}