import { SignUpActionType } from './action-types';

export interface UserSignUpAction {
    type: SignUpActionType.USER_SIGN_UP;
    payload?: any;
}
