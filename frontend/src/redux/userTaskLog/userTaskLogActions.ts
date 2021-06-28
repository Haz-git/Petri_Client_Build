import api from '../../api';
import { Dispatch } from 'redux';
import { ActionType } from './action-types';
import { Action } from './userTaskLogInterfaces';

interface State {
    //Indexable Type:
    auth: {
        userLogIn: {
            data: {
                _id: string;
            };
        };
    };
}

export function getTasks() {
    return async (dispatch: Dispatch<Action>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/getTasks', { _id });

        dispatch({
            type: ActionType.USER_GET_TASKS,
            payload: response.data.existingUserTaskList,
        });
    };
}

export function addNewTask(data: string) {
    return async (dispatch: Dispatch<Action>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(`/users/task`, { data, _id });

        dispatch({
            type: ActionType.USER_NEW_TASK,
            payload: response.data.userNewTaskList,
        });
    };
}

export function deleteTask(task: string) {
    return async (dispatch: Dispatch<Action>, getState: () => State) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post(`/users/task/delete`, { task, _id });

        dispatch({
            type: ActionType.USER_DELETED_TASK,
            payload: response.data.afterDeletionTaskList,
        });
    };
}
