import history from '../historyObject';
import { userLogOut } from '../redux/logout_action';

export const logouthelper = () => {
    //Remove JWT.
    localStorage.removeItem('jwt');
    localStorage.removeItem('persist:root');
    userLogOut();
    window.location.reload();

}