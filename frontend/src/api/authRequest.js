import axios from 'axios';

/*
This API is created exactly identical to the standard one located in index.js, however there is NO header with JWT because the JWT has not been sent over from the server.

*/

export default axios.create({
    baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://petri-webapp-heroku.herokuapp.com/api',
    withCredentials: true,
});