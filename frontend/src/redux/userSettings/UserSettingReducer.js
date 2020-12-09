import {
    USER_ADD_NEW_PROFILE_PICTURE,
    USER_GET_PROFILE_PICTURE,
    USER_CHANGE_EMAIL_ADDRESS,
    USER_CHANGE_FIRSTNAME,
    USER_CHANGE_LASTNAME,
    USER_CHANGE_USERNAME,
} from './UserSettingTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ADD_NEW_PROFILE_PICTURE:
            return {...state, userSettings: action.payload};
        case USER_GET_PROFILE_PICTURE:
            return {...state, userSettings: action.payload};
        case USER_CHANGE_EMAIL_ADDRESS:
            return {...state, userSettings: action.payload};
        case USER_CHANGE_FIRSTNAME:
            return {...state, userSettings: action.payload};
        case USER_CHANGE_LASTNAME:
            return {...state, userSettings: action.payload};
        case USER_CHANGE_FIRSTNAME:
            return {...state, userSettings: action.payload};
        default:
            return state;
    }
}