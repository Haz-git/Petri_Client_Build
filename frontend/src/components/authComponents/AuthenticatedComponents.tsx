import React, { useState, useEffect } from 'react';
import { getJWT } from '../../utils/jwthelper';
import history from '../../historyObject';
import jsonwebtoken from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const AuthenticatedComponents = ({ children }): JSX.Element => {
    const [access, setAccess] = useState(false);

    const location = useLocation();

    useEffect(() => {
        // Use helper function to grab JWT from localstorage.
        const jwt = getJWT();
        //If there's no JWT present in the localstorage, no JWT must be sent over from server, meaning that login is wrong. Push the user back to the login page.
        if (
            !jwt ||
            (Object.keys(jwt).length === 0 && jwt.constructor === Object)
        ) {
            history.push('/login');
        } else if (jwt) {
            const decodedToken = jsonwebtoken.decode(jwt, {
                complete: true,
            });

            const currDate = new Date();

            //Check for manipulated JWT:
            if (decodedToken === null) {
                localStorage.removeItem('jwt');
                alert('Your JWT is not valid. Please sign in again.');
                history.push('/login');
            }

            //Check for expired JWT:
            if (decodedToken.payload.exp * 1000 < currDate.getTime()) {
                localStorage.removeItem('jwt');
                alert('Your session has expired. Please sign in to continue.');
                history.push('/login');
            }
        }

        //If the user's JWT is present: set the React state to 'temp' instead of undefined
        setAccess(true);
    }, [location]);

    return <>{access === true ? <>{children}</> : null}</>;
    //If the react state is undefined, return a small statement. Else, return the app dashboard.
};

export default AuthenticatedComponents;
