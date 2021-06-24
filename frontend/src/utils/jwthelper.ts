export const getJWT = () => {
    return JSON.parse(localStorage.getItem('jwt') || '{}');

    //localStorage.getItem can return either a string or null. JSON.parse() requires a string, and so we should test the result of localStorage.getItem() before trying to use it.
};
