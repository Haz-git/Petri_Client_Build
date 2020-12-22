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

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://petri-webapp-heroku.herokuapp.com/api',
    withCredentials: true,
    headers: {
        'Authorization': `Bearer ${JWT}`,
    }
});