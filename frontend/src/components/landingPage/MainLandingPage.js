//Dependencies:
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { getJWT } from '../../utils/jwthelper';
import history from '../../historyObject';

//Components
import MainBackdrop from './MainBackdrop';
import MainBodyblock from './MainBodyblock';
import Footer from './Footer';

const MainLandingPage = () => {
    /*
        When the user enters the landing page, this component is the master component that is rendered first. Using the util function getJWT(), grab any JWT stored in the localstorage. If the user has a JWT, then push the user to the dashboard.
    */

    useEffect(() => {
        const jwtCheck = getJWT();

        if (
            jwtCheck &&
            Object.keys(jwtCheck).length !== 0 &&
            jwtCheck.constructor !== Object
        ) {
            history.push('/dashboard');
        }
    }, []);

    return (
        <>
            <MainBackdrop />
            <MainBodyblock />
            <Footer />
        </>
    );
};

export default MainLandingPage;
