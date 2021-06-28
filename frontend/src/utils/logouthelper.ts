import { userLogOut } from '../redux/logout_action';

export const logoutHelper = () => {
    //Remove JWT.
    localStorage.removeItem('jwt');
    localStorage.removeItem('persist:root');
    userLogOut();
    window.location.reload();
};
