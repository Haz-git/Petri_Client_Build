import { USER_SIGN_UP } from '../userSignUp/userSignUpTypes';
import { USER_LOG_IN } from '../userLogin/userLoginTypes';


const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_SIGN_UP:
            return {...state, userSignUp: action.payload};
        case USER_LOG_IN:
            return {...state, userLogIn: action.payload};
        default:
            return state;
    }
}