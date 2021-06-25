import { USER_LOG_IN } from '../userLogin/userLoginTypes';

//Action Interfaces and action-types for userSignUp functions:
import { UserSignUpActionInterface } from '../userSignUp/userSignUpInterfaces';
import { SignUpActionType } from '../userSignUp/action-types';

//Action Interfaces and action-types for userLogIn functions:
import { UserLogInActionInterface } from '../userLogin/userLoginInterfaces';
import { LogInActionType } from '../userLogin/action-types';

const initialState = {};

//This reducer handles user login and user sign up authentication.

export default (
    state: Object = initialState,
    action: UserSignUpActionInterface & UserLogInActionInterface
) => {
    switch (action.type) {
        case SignUpActionType.USER_SIGN_UP:
            return { ...state, userSignUp: action.payload };
        case LogInActionType.USER_LOG_IN:
            return { ...state, userLogIn: action.payload };
        default:
            return state;
    }
};
