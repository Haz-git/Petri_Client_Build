import { USER_ADD_NEW_PROFILE_PICTURE } from './UserSettingTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ADD_NEW_PROFILE_PICTURE:
            return {...state, userSettings: action.payload};
        default:
            return state;
    }
}