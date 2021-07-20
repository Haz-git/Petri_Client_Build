import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    // baseURL: 'https://petri-webapp-heroku.herokuapp.com/api',
    withCredentials: true,
    headers: {
        Authorization: JSON.parse(localStorage.getItem('jwt') || '{}'),
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');

        if (token) {
            config.headers.Authorization = JSON.parse(token);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
