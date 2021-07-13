import { Dispatch } from 'redux';
import { SignUpActionType } from './action-types';
import { UserSignUpActionInterface } from './userSignUpInterfaces';

import api from '../../api';
import history from '../../historyObject';

//Form Values is given as an object.

const userSignUp =
    (formValues: {}) =>
    async (dispatch: Dispatch<UserSignUpActionInterface>) => {
        //Send redux form values to DB:
        const response = await api.post('/users/signup', {
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
