import { SettingsActionType } from './action-types';

export interface IGetProfilePic {
    type: SettingsActionType.USER_GET_PROFILE_PICTURE;
    payload?: any;
}

export interface IAddNewProfilePic {
    type: SettingsActionType.USER_ADD_NEW_PROFILE_PICTURE;
    payload?: any;
}

export interface IChangeLastName {
    type: SettingsActionType.USER_CHANGE_LASTNAME;
    payload?: any;
}

export interface IChangeFirstName {
    type: SettingsActionType.USER_CHANGE_FIRSTNAME;
    payload?: any;
}

export interface IChangeUserName {
    type: SettingsActionType.USER_CHANGE_USERNAME;
    payload?: any;
}

export interface IChangeEmailAddress {
    type: SettingsActionType.USER_CHANGE_EMAIL_ADDRESS;
    payload?: any;
}

export type SettingsAction =
    | IGetProfilePic
    | IAddNewProfilePic
    | IChangeLastName
    | IChangeFirstName
    | IChangeUserName
    | IChangeEmailAddress;
