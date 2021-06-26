//Action Interfaces and action-types for userSignUp functions:
import { UserSignUpActionInterface } from '../userSignUp/userSignUpInterfaces';
import { SignUpActionType } from '../userSignUp/action-types';

//Action Interfaces and action-types for userLogIn functions:
import { UserLogInActionInterface } from '../userLogin/userLoginInterfaces';
import { LogInActionType } from '../userLogin/action-types';

const initialState = {};

//Because we'll need the Action Interfaces from both userSignUp and UserLogIn, we'll create an intersection interface extending both action interfaces. Since type can be from UserSignUp or UserLogIn, we'll use any.
interface AuthActionInterface
    extends UserSignUpActionInterface,
        UserLogInActionInterface {
    type: any;
    payload?: any;
}

//This reducer handles user login and user sign up authentication.

export default (state: Object = initialState, action: AuthActionInterface) => {
    switch (action.type) {
        case SignUpActionType.USER_SIGN_UP:
            return { ...state, userSignUp: action.payload };
        case LogInActionType.USER_LOG_IN:
            return { ...state, userLogIn: action.payload };
        default:
            return state;
    }
};
