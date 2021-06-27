import { SettingsActionType } from './action-types';
import { SettingsAction } from './UserSettingInterfaces';

const initialState = {};

export default (state: Object = initialState, action: SettingsAction) => {
    switch (action.type) {
        case SettingsActionType.USER_ADD_NEW_PROFILE_PICTURE:
            return { ...state, userSettings: action.payload };
        case SettingsActionType.USER_GET_PROFILE_PICTURE:
            return { ...state, userSettings: action.payload };
        case SettingsActionType.USER_CHANGE_EMAIL_ADDRESS:
            return { ...state, userSettings: action.payload };
        case SettingsActionType.USER_CHANGE_FIRSTNAME:
            return { ...state, userSettings: action.payload };
        case SettingsActionType.USER_CHANGE_LASTNAME:
            return { ...state, userSettings: action.payload };
        case SettingsActionType.USER_CHANGE_FIRSTNAME:
            return { ...state, userSettings: action.payload };
        default:
            return state;
    }
};
