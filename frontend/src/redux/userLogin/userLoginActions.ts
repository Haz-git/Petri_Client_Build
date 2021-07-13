import { Dispatch } from 'redux';
import { LogInActionType } from './action-types';
import { UserLogInActionInterface } from './userLoginInterfaces';

import history from '../../historyObject';
import api from '../../api';

//Async Await LocalStorage:
const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    },
};

const userLogin =
    (formValues: {}) =>
    async (dispatch: Dispatch<UserLogInActionInterface>) => {
        //Push the user to a loading page for confirmation of Login...:
        // Send a POST request to api;

        let response;

        try {
            response = await api.post('/users/login', {
                ...formValues,
            });
        } catch (error) {
            if (error) {
                const errorFlag = true;
                return errorFlag;
            }
        }

        if (response) {
            try {
                asyncLocalStorage
                    .setItem('jwt', JSON.stringify(response.data.token))
                    .then(() => {
                        return asyncLocalStorage
                            .getItem('jwt')
                            .then((value) => {
                                if (value !== undefined && value !== null) {
                                    history.push('/dashboard');
                                }
                            });
                    });
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    localStorage.clear();
                    localStorage.setItem('jwt', response.data.token);
                } else {
                    alert(
                        `I'm Sorry! There seems to be a problem logging you in.`
                    );
                    console.log(e);
                }
            }
        }

        dispatch({
            type: LogInActionType.USER_LOG_IN,
            payload: response.data,
        });
    };

export default userLogin;
