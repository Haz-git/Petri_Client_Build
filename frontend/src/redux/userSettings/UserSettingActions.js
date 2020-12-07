import api from '../../api';
import { USER_ADD_NEW_PROFILE_PICTURE } from './UserSettingTypes';

export function userAddNewProfilePicture(imgURL, imgConstraints) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } }} } = getState();

        console.log('ActionController');

        const response = await api.post('/users/settings/setNewProPic', { _id, imgURL, imgConstraints });

        console.log(response);

        // dispatch({
        //     type: USER_ADD_NEW_PROFILE_PICTURE,
        //     payload: response.data.profileImg,
        // })
    }
}