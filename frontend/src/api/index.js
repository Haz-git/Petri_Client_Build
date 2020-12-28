import axios from 'axios';

const createAxiosInstanceWithHeader = () => {
    const localStorageItem = JSON.parse(localStorage.getItem('jwt'));


    if (localStorageItem !== null && localStorageItem !== undefined) {
        if (localStorageItem.token !== undefined) {
            const JWT = localStorageItem.token;

            //Bearer + JWT has been attached to the header of the axios instance--this is used for the authenticateJWT protection middleware in the server for editing actions, but not for data retrieval.

            const axiosInstanceHeader = axios.create({
                baseURL: 'http://localhost:8080/api',
                // baseURL: 'https://petri-webapp-heroku.herokuapp.com/api',
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                }
            });

            return axiosInstanceHeader;
        }
    }

}

const axiosInstance = createAxiosInstanceWithHeader();


export default axiosInstance;