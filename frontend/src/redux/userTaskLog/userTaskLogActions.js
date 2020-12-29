import api from '../../api';
import { USER_NEW_TASK, USER_GET_TASKS, USER_DELETED_TASK } from './userTaskLogTypes';

export function getTasks() {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();
        const response = await api.post('/users/getTasks', { _id });

        dispatch({
            type: USER_GET_TASKS,
            payload: response.data.existingUserTaskList,
        })
    }
}

export function addNewTask(data) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post(`/users/task`, {data, _id});

        dispatch({
            type: USER_NEW_TASK,
            payload: response.data.userNewTaskList,
        });
    }
}

export function deleteTask(task) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id }}}} = getState();

        const response = await api.post(`/users/task/delete`, {task, _id});

        dispatch({
            type: USER_DELETED_TASK,
            payload: response.data.afterDeletionTaskList,
        });
    }
}
