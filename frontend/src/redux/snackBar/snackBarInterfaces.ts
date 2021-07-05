import { SnackBarActionType } from './action-types';

export interface OpenSnackbar {
    type: SnackBarActionType.TOGGLE_SNACKBAR_OPEN;
    message: string;
}

export interface CloseSnackbar {
    type: SnackBarActionType.TOGGLE_SNACKBAR_CLOSE;
}

export type SnackbarAction = OpenSnackbar | CloseSnackbar;
