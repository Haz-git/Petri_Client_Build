import { Dispatch } from 'redux';
import { SignUpActionType } from './action-types';
import { UserSignUpActionInterface } from './userSignUpInterfaces';

import authRequestAPI from '../../api/authRequest';
import history from '../../historyObject';

//Form Values is given as an object.

const userSignUp =
    (formValues: {}) =>
    async (dispatch: Dispatch<UserSignUpActionInterface>) => {
        //Send redux form values to DB:
        const response = await authRequestAPI.post('/users/signup', {
            ...formValues,
        });

        //dispatch information recieved from DB to reducers:

        dispatch({
            type: SignUpActionType.USER_SIGN_UP,
            payload: response.data,
        });

        history.push('/');
    };

export default userSignUp;
