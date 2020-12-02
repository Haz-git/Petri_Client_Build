//Dependencies:
import React, { useEffect } from 'react';

import { getJWT } from '../../utils/jwthelper';
import history from '../../historyObject';

//Components
import MainBackdrop from './MainBackdrop';
import MainBodyblock from './MainBodyblock';
import Footer from './Footer';

const MainLandingPage = () => {

    useEffect(() => {
        const jwtCheck = getJWT();

        if (jwtCheck !== undefined && jwtCheck !== null) {
            history.push('/dashboard');
        }
    }, [])


    return (
        <>
            <MainBackdrop />
            <MainBodyblock />
            <Footer /> 
        </>
    )
}

export default MainLandingPage;