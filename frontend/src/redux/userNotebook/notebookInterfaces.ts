import { NotebookActionType } from './action-types';

export interface addNote {
    type: NotebookActionType.USER_ADD_NOTE;
    payload?: any;
}

export interface updateNote {
    type: NotebookActionType.USER_UPDATE_NOTE;
    payload?: any;
}

export interface deleteNote {
    type: NotebookActionType.USER_DELETE_NOTE;
    payload?: any;
}

export interface addFolder {
    type: NotebookActionType.USER_ADD_FOLDER;
    payload?: any;
}

export interface deleteFolder {
    type: NotebookActionType.USER_DELETE_FOLDER;
    payload?: any;
}

export interface renameFolder {
    type: NotebookActionType.USER_RENAME_FOLDER;
    payload?: any;
}

export interface getNotebook {
    type: NotebookActionType.USER_GET_NOTEBOOK;
    payload?: any;
}

export type NotebookAction =
    | addNote
    | updateNote
    | deleteNote
    | addFolder
    | deleteFolder
    | renameFolder
    | getNotebook;
