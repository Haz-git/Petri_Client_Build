import { Action } from './userTaskLogInterfaces';
import { ActionType } from './action-types';
// import {
//     USER_NEW_TASK,
//     USER_GET_TASKS,
//     USER_DELETED_TASK,
// } from './userTaskLogTypes';

const initialState = {};

export default (state: Object = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.USER_NEW_TASK:
            return { ...state, Tasks: action.payload };
        case ActionType.USER_GET_TASKS:
            return { ...state, Tasks: action.payload };
        case ActionType.USER_DELETED_TASK:
            return { ...state, Tasks: action.payload };
        default:
            return state;
    }
};
