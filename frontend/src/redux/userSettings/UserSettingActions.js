import api from '../../api/index';
import authRequest from '../../api/authRequest';
import { 
    USER_ADD_NEW_PROFILE_PICTURE,
    USER_GET_PROFILE_PICTURE,
    USER_CHANGE_EMAIL_ADDRESS,
    USER_CHANGE_FIRSTNAME,
    USER_CHANGE_LASTNAME,
    USER_CHANGE_USERNAME,
} from './UserSettingTypes';
import historyObject from '../../historyObject';

export function userGetProfilePicture() {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await authRequest.post('/users/settings/getProPic', { _id });
        
        dispatch({
            type: USER_GET_PROFILE_PICTURE,
            payload: response.data.existingUser
        })
        //This should render loading == false in main dashboard.
        return false;
    }
}

export function userAddNewProfilePicture(imgURL, imgConstraints) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/setNewProPic', { _id, imgURL, imgConstraints });

        dispatch({
            type: USER_ADD_NEW_PROFILE_PICTURE,
            payload: response.data.responseUpdatedProfilePic,
        })

        historyObject.push('/settings');
    }
}

export function userChangeLastName(newLastName) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/changeLastName', { _id, newLastName });

        dispatch({
            type: USER_CHANGE_LASTNAME,
            payload: response.data.updatedLastNameUser
        })

        /*Notes:

        So, this works as intended. However, we need to decide on only one place in our store where our full user details are stored. Currently, we have two main components that rely on separate things in our store:

        1. Main Dashboard -- This component reaches into our stored JWT in our localstorage to retrieve user data. Obviously this was done a while back and should not be the case. I need to change this to the current 'slice' of the store

        2. Messenger -- This component relies on the data within our 'auth' slice of the store. Ideally, we need to switch this to our current 'slice of the store'

        ***also, not a component, but maybe instead of userSettings we should name this component userDetails? I'm sure there are more components to refactor when we do the change.


        */
    }
}

export function userChangeFirstName(newFirstName) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/changeFirstName', { _id, newFirstName });

        dispatch({
            type: USER_CHANGE_FIRSTNAME,
            payload: response.data.updatedFirstNameUser
        })
    }
}

export function userChangeUserName(newUserName) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/changeUserName', { _id, newUserName });

        dispatch({
            type: USER_CHANGE_USERNAME,
            payload: response.data.updatedUserNameUser
        })
    }
}

export function userChangeEmailAddress(newEmailAddress) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/changeEmailAddress', { _id, newEmailAddress });

        dispatch({
            type: USER_CHANGE_EMAIL_ADDRESS,
            payload: response.data.updatedEmailAddressUser
        })
    }
}