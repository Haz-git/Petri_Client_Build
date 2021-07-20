import { NotebookActionType } from './action-types';
import { NotebookAction } from './notebookInterfaces';

const initialState = {};

export default (state: Object = initialState, action: NotebookAction) => {
    switch (action.type) {
        case NotebookActionType.USER_ADD_NOTE:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_UPDATE_NOTE:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_DELETE_NOTE:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_ADD_FOLDER:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_DELETE_FOLDER:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_RENAME_FOLDER:
            return { ...state, notebook: action.payload };
        case NotebookActionType.USER_GET_NOTEBOOK:
            return { ...state, notebook: action.payload };
        default:
            return state;
    }
};
