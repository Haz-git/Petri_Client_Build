import api from '../../api';
import history from '../../historyObject';
import { USER_SIGN_UP } from './userSignUpTypes';

const userSignUp = (formValues) => async dispatch => {
    //Send redux form values to DB:
    const response = await api.post('/users/signup', {...formValues});

    //dispatch information recieved from DB to reducers:

    dispatch({
        type: USER_SIGN_UP,
        payload: response.data,
    })

    history.push('/');
}

export default userSignUp;