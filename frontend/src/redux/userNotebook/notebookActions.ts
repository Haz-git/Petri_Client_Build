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

        const response = await api.post('/users/notebook/note/delete', {
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

export const renameNote = (
    noteId: string,
    parentId: string,
    requestType: string,
    updatedHTMLState: string,
    updatedNoteName: string
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

        const response = await api.post('/users/notebook/note/update', {
            _id,
            noteId,
            parentId,
            requestType,
            updatedHTMLState,
            updatedNoteName,
        });

        dispatch({
            type: NotebookActionType.USER_UPDATE_NOTE,
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

        const response = await api.post('/users/notebook/folder/delete', {
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

export const renameFolder = (
    folderId: string,
    parentId: string,
    newFolderName: string
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

        const response = await api.post('/users/notebook/folder/edit', {
            _id,
            folderId,
            parentId,
            newFolderName,
        });

        dispatch({
            type: NotebookActionType.USER_RENAME_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};
