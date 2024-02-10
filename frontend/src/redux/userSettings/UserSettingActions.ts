import api from '../../api/index';
import { Dispatch } from 'redux';
import { SettingsActionType } from './action-types';
import { SettingsAction } from './UserSettingInterfaces';
import historyObject from '../../historyObject';

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

export function userGetProfilePicture() {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        try {
            const {
                auth: {
                    userLogIn: {
                        data: { _id },
                    },
                },
            } = getState();

            const response = await api.post('/users/settings/getProPic', {
                _id,
            });

            dispatch({
                type: SettingsActionType.USER_GET_PROFILE_PICTURE,
                payload: response.data.existingUser,
            });
        } catch (e) {
            console.log(e);
        }

        //This should render loading == false in main dashboard.
        return false;
    };
}

export function userAddNewProfilePicture(
    imgURL: any,
    imgConstraints: any,
    renderSnackbar: (message: string) => void,
    btnCallback: (status: boolean) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/settings/setNewProPic', {
            _id,
            imgURL,
            imgConstraints,
        });

        if (response) {
            renderSnackbar('Your new profile picture has been saved');
            btnCallback(false);
        }

        dispatch({
            type: SettingsActionType.USER_ADD_NEW_PROFILE_PICTURE,
            payload: response.data.responseUpdatedProfilePic,
        });
    };
}

export function userChangeLastName(
    newLastName: string,
    renderSnackbar: (message: string) => void,
    btnCallback: (status: boolean) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/settings/changeLastName', {
            _id,
            newLastName,
        });

        if (response) {
            renderSnackbar(
                'Your personal details have been updated successfully.'
            );
            btnCallback(false);
        }

        dispatch({
            type: SettingsActionType.USER_CHANGE_LASTNAME,
            payload: response.data.updatedLastNameUser,
        });

        /*Notes:

        So, this works as intended. However, we need to decide on only one place in our store where our full user details are stored. Currently, we have two main components that rely on separate things in our store:

        1. Main Dashboard -- This component reaches into our stored JWT in our localstorage to retrieve user data. Obviously this was done a while back and should not be the case. I need to change this to the current 'slice' of the store

        2. Messenger -- This component relies on the data within our 'auth' slice of the store. Ideally, we need to switch this to our current 'slice of the store'

        ***also, not a component, but maybe instead of userSettings we should name this component userDetails? I'm sure there are more components to refactor when we do the change.


        */
    };
}

export function userChangeFirstName(
    newFirstName: string,
    renderSnackbar: (message: string) => void,
    btnCallback: (status: boolean) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/settings/changeFirstName', {
            _id,
            newFirstName,
        });

        if (response) {
            renderSnackbar(
                'Your personal details have been updated successfully.'
            );
            btnCallback(false);
        }

        dispatch({
            type: SettingsActionType.USER_CHANGE_FIRSTNAME,
            payload: response.data.updatedFirstNameUser,
        });
    };
}

export function userChangeUserName(
    newUserName: string,
    renderSnackbar: (message: string) => void,
    btnCallback: (status: boolean) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/settings/changeUserName', {
            _id,
            newUserName,
        });

        if (response) {
            renderSnackbar(
                'Your personal details have been updated successfully.'
            );
            btnCallback(false);
        }

        dispatch({
            type: SettingsActionType.USER_CHANGE_USERNAME,
            payload: response.data.updatedUserNameUser,
        });
    };
}

export function userChangeEmailAddress(
    newEmailAddress: string,
    renderSnackbar: (message: string) => void,
    btnCallback: (status: boolean) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/settings/changeEmailAddress', {
            _id,
            newEmailAddress,
        });

        if (response) {
            renderSnackbar(
                'Your personal details have been updated successfully.'
            );
            btnCallback(false);
        }

        dispatch({
            type: SettingsActionType.USER_CHANGE_EMAIL_ADDRESS,
            payload: response.data.updatedEmailAddressUser,
        });
    };
}

//Change user password:

export function userChangePassword(
    newPassword: string,
    newPasswordConfirm: string,
    currentPassword: string,
    snackbarCallback: (message: string) => void,
    btnCallback: (status: boolean) => void,
    errorCallback: (status: boolean, message: string) => void
) {
    return async (
        dispatch: Dispatch<SettingsAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        try {
            const response = await api.post('/users/settings/changePassword', {
                _id,
                newPassword,
                newPasswordConfirm,
                currentPassword,
            });

            if (response) {
                snackbarCallback(
                    'Your password has been changed successfully.'
                );
                btnCallback(false);
            }
        } catch (error: any) {
            errorCallback(true, error.response.data.msg);
            btnCallback(false);
        }

        //No need to dispatch anything.
    };
}
