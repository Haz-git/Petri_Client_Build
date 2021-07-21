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

/* Note-specific action creators */

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
    noteName: string,
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

        const response = await api.post('/users/notebook/note/create', {
            _id,
            noteName,
            htmlState,
            parentId,
        });

        dispatch({
            type: NotebookActionType.USER_ADD_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

export const deleteNote = (noteId: string, parentId: string) => {
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

        const response = await api.post('/users/notebook/note/create', {
            _id,
            noteId,
            parentId,
        });

        dispatch({
            type: NotebookActionType.USER_DELETE_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

/*Folder-specific action creators*/

export const createNewFolder = (folderName: string, parentId: string) => {
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

        const response = await api.post('/users/notebook/folder/create', {
            _id,
            folderName,
            parentId,
        });

        dispatch({
            type: NotebookActionType.USER_ADD_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};

export const deleteFolder = (folderId: string, parentId: string) => {
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

        const response = await api.post('/users/notebook/note/create', {
            _id,
            folderId,
            parentId,
        });

        dispatch({
            type: NotebookActionType.USER_DELETE_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};
