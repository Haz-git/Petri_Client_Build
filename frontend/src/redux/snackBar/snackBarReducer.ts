import { SnackBarActionType } from './action-types';
import { SnackbarAction } from './snackBarInterfaces';

interface IinitialState {
    toggleSnackbar: boolean;
    snackbarMessage: string | null;
}

const initialState = {
    toggleSnackbar: false,
    snackbarMessage: null,
};

export default (
    state: IinitialState = initialState,
    action: SnackbarAction
) => {
    switch (action.type) {
        case SnackBarActionType.TOGGLE_SNACKBAR_OPEN:
            return {
                ...state,
                toggleSnackbar: true,
                snackbarMessage: action.message,
            };
        case SnackBarActionType.TOGGLE_SNACKBAR_CLOSE:
            return {
                ...state,
                toggleSnackbar: false,
                snackbarMessage: null,
            };

        default: {
            return state;
        }
    }
};
