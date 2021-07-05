import { Dispatch } from 'redux';
import { SnackBarActionType } from './action-types';
import { SnackbarAction } from './snackBarInterfaces';

export const toggleSnackbarOpen = (message: string) => ({
    type: SnackBarActionType.TOGGLE_SNACKBAR_OPEN,
    message: message,
});

export const toggleSnackbarClose = () => ({
    type: SnackBarActionType.TOGGLE_SNACKBAR_CLOSE,
});
