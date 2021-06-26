import { SignUpActionType } from './action-types';

export interface UserSignUpActionInterface {
    type: SignUpActionType.USER_SIGN_UP;
    payload?: any;
}
