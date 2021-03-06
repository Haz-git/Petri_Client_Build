import history from '../historyObject';
const USER_LOGOUT = 'USER_LOGOUT';

export function userLogOut() {
    return async (dispatch: any) => {
        dispatch({
            type: USER_LOGOUT,
            payload: '',
        });

        history.push('/logout');
    };
}
