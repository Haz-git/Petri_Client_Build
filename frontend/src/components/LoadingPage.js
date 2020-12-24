import React from 'react';
import Fade from 'react-reveal/Fade';

//Styles:
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const fadeIn = keyframes`
    0% { opacity: 0 }
    10% { opacity: 0.1}
    20% { opacity: 0.2}
    30% { opacity: 0.3 }
    40% { opacity: 0.4 }
    50% { opacity: 0.5 }
    60% { opacity: 0.6 }
    70% { opacity: 0.7 }
    80% { opacity: 0.8 }
    90% { opacity: 0.9 }
    100% { opacity: 1 }
`

const MainContainer = styled.div`
    position: fixed;
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: #141628;
    animation-name: ${fadeIn};
    -webkit-animation: fadeIn .8s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeIn .8s; /* Firefox < 16 */
    -ms-animation: fadeIn .8s; /* Internet Explorer */
    -o-animation: fadeIn .8s; /* Opera < 12.1 */
    animation: fadeIn .8s;
    z-index: 9999;
`


const SpinnerContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: White;
`

const LoadingCharacterContainer = styled.div`
    position: fixed;
    top: 59%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: White;
`

const LoadingCharacters = styled.h1`
    font-family: 'Nunito', sans-serif, helvetica;
    font-size: 30px;
    font-weight: 100;
    color: White;
`


//Render:

const LoadingPage = ({ renderLoading }) => {

    if (renderLoading === true) {
        return (
            <>
                <MainContainer>
                    <SpinnerContainer>
                        <CircularProgress size={100} color='inherit' thickness={1} />
                    </SpinnerContainer>
                    <LoadingCharacterContainer>
                        <LoadingCharacters>
                            Verifying your identity...
                        </LoadingCharacters>
                    </LoadingCharacterContainer>
                </MainContainer>
            </>
        )
    } else {
        return null;
    }
}

export default LoadingPage;
