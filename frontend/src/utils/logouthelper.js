import history from '../historyObject';
import { userLogOut } from '../redux/logout_action';

export const logouthelper = () => {
    //Remove JWT.
    localStorage.removeItem('jwt');
    localStorage.removeItem('persist:root');
    localStorage.clear();
    userLogOut();
    console.log('User has logged out successfully');
    window.location.reload(true);

}