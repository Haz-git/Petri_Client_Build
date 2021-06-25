import { ActionType } from './action-types';

interface NewTaskAction {
    type: ActionType.USER_NEW_TASK;
    payload?: any;
}

interface GetTasksAction {
    type: ActionType.USER_GET_TASKS;
    payload?: any;
}

interface DeleteTaskAction {
    type: ActionType.USER_DELETED_TASK;
    payload?: any;
}

export type Action = NewTaskAction | GetTasksAction | DeleteTaskAction;
