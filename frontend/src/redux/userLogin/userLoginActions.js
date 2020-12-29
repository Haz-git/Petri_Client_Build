import { USER_LOG_IN } from '../userLogin/userLoginTypes';
import history from '../../historyObject';
import authRequestAPI from '../../api/authRequest';

const userLogin = formValues => async dispatch => {

    //Push the user to a loading page for confirmation of Login...:

    // Send a POST request to api;

    let response; 

    try {
        response = await authRequestAPI.post('/users/login', {...formValues});
    } catch (error) {
        if (error) {
            const errorFlag = true;
            return errorFlag;
        }
    }

    // Store JWT in response into localstorage:
    try {
        //Outsourcing localstorage methods to promise to emulate asynchronous operation. When JWT is successfully set into localstorage, then we'll dispatch data to the state.
        localStorage.setItem('jwt', JSON.stringify(response.data.token));

        dispatch({
            type: USER_LOG_IN,
            payload: response.data,
        });

        const jwtCheck = localStorage.getItem('jwt');

        if (jwtCheck !== null && jwtCheck !== undefined) {
            history.push('/dashboard');
            //This is an incredibly inefficient and not react-minded compromise for the Bearer - Token issue. Hopefully in the future i'll think of something else.
            window.location.reload();
        }

        // history.push('/dashboard');

    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            localStorage.clear();
            localStorage.setItem('jwt', response.data.token);
        } else {
            alert('Your local storage seems to be full...');
            console.log(e);
        }
    }

}

export default userLogin;