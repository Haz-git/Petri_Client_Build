export const getJWT = () => {
    return JSON.parse(localStorage.getItem('jwt'));
}