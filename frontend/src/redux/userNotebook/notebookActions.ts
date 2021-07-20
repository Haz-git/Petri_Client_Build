import api from '../../api';
import { Dispatch } from 'redux';
import { NotebookActionType } from './action-types';
import { NotebookAction } from './notebookInterfaces';

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

export const getNotebook = () => {
    return async (
        dispatch: Dispatch<NotebookAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/notebook/get', { _id });

        console.log(response);

        dispatch({
            type: NotebookActionType.USER_GET_NOTEBOOK,
            payload: response.data.userNotebook,
        });
    };
};

export const createNewNote = (
    name: string,
    htmlState: any,
    parentId: string
) => {
    return async (
        dispatch: Dispatch<NotebookAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/bionote/create', {
            _id,
            bioName: name,
            htmlState,
            parentId,
        });

        dispatch({
            type: NotebookActionType.USER_ADD_NOTE,
            payload: response.data.userNotebook,
        });
    };
};
