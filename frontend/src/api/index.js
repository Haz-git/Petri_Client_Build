import axios from 'axios';
import { getJWT } from '../utils/jwthelper';

//Grab JWT from localstorage, send as request header to backend.
const localStorageItem = getJWT();
let JWT;

//Check if the JWT is properly located within 'token' of the localStorageItem

if (localStorageItem !== null && localStorageItem !== undefined) {
    if (localStorageItem.token !== undefined) {
        JWT = localStorageItem.token;
    }
}

//Bearer + JWT has been attached to the header of the axios instance--this is used for the authenticateJWT protection middleware in the server.

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://petri-webapp-heroku.herokuapp.com/api',
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${JWT}`,
    }
});