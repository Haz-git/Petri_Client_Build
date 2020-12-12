import { USER_LOG_IN } from '../userLogin/userLoginTypes';
import history from '../../historyObject';
import api from '../../api';

const userLogin = formValues => async dispatch => {

    //Push the user to a loading page for confirmation of Login...:
    history.push('/loading');

    // Send a POST request to api:
    const response = await api.post('/users/login', {...formValues});

    //Store JWT in response into localstorage:

    try {
        localStorage.setItem('jwt', JSON.stringify(response.data));
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            localStorage.clear();
            localStorage.setItem('jwt', JSON.stringify(response.data));
        } else {
            alert('Your local storage seems to be full...');
        }
    }

    //Dispatch response object to reducers:
    dispatch({
        type: USER_LOG_IN,
        payload: response.data,
    })

    history.push('/dashboard');

}

export default userLogin;