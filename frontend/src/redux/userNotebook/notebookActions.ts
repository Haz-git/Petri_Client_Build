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

export const getNotebook = (statusCallback: (status: boolean) => void) => {
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

        if (response) {
            statusCallback(true);
        }

        dispatch({
            type: NotebookActionType.USER_GET_NOTEBOOK,
            payload: response.data.userNotebook,
        });
    };
};

export const createNewNote = (
    noteName: string,
    htmlState: any,
    parentId: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your note has been created.');
        }

        dispatch({
            type: NotebookActionType.USER_ADD_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

export const deleteNote = (
    noteId: string,
    parentId: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        const response = await api.post('/users/notebook/note/delete', {
            _id,
            noteId,
            parentId,
        });

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your note has been removed.');
        }

        dispatch({
            type: NotebookActionType.USER_DELETE_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

export const updateNote = (
    noteId: string,
    parentId: string,
    requestType: string,
    updatedHTMLState: string,
    updatedNoteName: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your note has been updated.');
        }

        dispatch({
            type: NotebookActionType.USER_UPDATE_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

export const updateNoteStarredStatus = (
    noteId: string,
    parentId: string,
    requestType: string
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

        const response = await api.post('/users/notebook/note/starred/update', {
            _id,
            noteId,
            parentId,
            requestType,
        });

        dispatch({
            type: NotebookActionType.USER_UPDATE_NOTE,
            payload: response.data.userNotebook,
        });
    };
};

/*Folder-specific action creators*/

export const createNewFolder = (
    folderName: string,
    parentId: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        const response = await api.post('/users/notebook/folder/create', {
            _id,
            folderName,
            parentId,
        });

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your folder has been created.');
        }

        dispatch({
            type: NotebookActionType.USER_ADD_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};

export const deleteFolder = (
    folderId: string,
    parentId: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        const response = await api.post('/users/notebook/folder/delete', {
            _id,
            folderId,
            parentId,
        });

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your folder has been removed.');
        }

        dispatch({
            type: NotebookActionType.USER_DELETE_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};

export const renameFolder = (
    folderId: string,
    parentId: string,
    newFolderName: string,
    snackbarCallback: (message: string) => void,
    buttonCallback: (status: boolean) => void
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

        if (response) {
            buttonCallback(false);
            snackbarCallback('Your folder has been renamed.');
        }

        dispatch({
            type: NotebookActionType.USER_RENAME_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};

export const updateFolderStarredStatus = (
    folderId: string,
    parentId: string,
    requestType: string
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

        const response = await api.post(
            '/users/notebook/folder/starred/update',
            {
                _id,
                folderId,
                parentId,
                requestType,
            }
        );

        dispatch({
            type: NotebookActionType.USER_UPDATE_FOLDER,
            payload: response.data.userNotebook,
        });
    };
};
