import api from '../../api';
import { 
    USER_ADD_NEW_PROFILE_PICTURE,
    USER_GET_PROFILE_PICTURE,
} from './UserSettingTypes';

export function userGetProfilePicture() {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        const response = await api.post('/users/settings/getProPic', { _id });
        
        dispatch({
            type: USER_GET_PROFILE_PICTURE,
            payload: response.data.userExistingImg.profileImg
        })
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
    }
}