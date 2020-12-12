import React from 'react';
import Fade from 'react-reveal/Fade';

//Styles:
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const fadeIn = keyframes`
    0% { opacity: 0 }
    30% { opacity: 0.3 }
    60% { opacity: 0.6 }
    80% { opacity: 0.8 }
    100% { opacity: 1 }
`

const MainContainer = styled.div`
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: #293241;
    animation-name: ${fadeIn};
    -webkit-animation: fadeIn .8s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadeIn .8s; /* Firefox < 16 */
    -ms-animation: fadeIn .8s; /* Internet Explorer */
    -o-animation: fadeIn .8s; /* Opera < 12.1 */
    animation: fadeIn .8s;
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

const LoadingPage = () => {
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
}

export default LoadingPage;
