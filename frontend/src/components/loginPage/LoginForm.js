import React, { useState } from 'react';
import styled from 'styled-components';
import { reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import userLogin from '../../redux/userLogin/userLoginActions';
import Fade from 'react-reveal/Fade';

import LoadingPage from '../LoadingPage';

//We will show a different button and a label on mobile view.

import Button from '@material-ui/core/Button';

import { MobileView, BrowserView } from 'react-device-detect';

//Styles:
import {
    MainHeader,
    SecondaryHeader,
    StyledField,
    StyledLabel,
    StyledButton,
    InputFieldContainer,
} from '../signupPage/SignUpForm';

const BackgroundWrapper = styled.div`
    position: fixed;
    display: block;
    height: 100vh;
    width: 100vw;
    background-color: #F6F9FC;
`
const MainContainer = styled.div`
    text-align: center;
    padding: 10px 10px;
    background-color:#F6F9FC;
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding: 0;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        padding: 0;
        transform: translate(-50%, -50%) scale(.77);
        top: 45%;
    }
`

const ErrorTextInvisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 15px;
    font-weight: 100;
    opacity: 0;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 9px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 9px;
    }
`

const ErrorTextVisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 15px;
    font-weight: 100;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 9px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 9px;
    }
`


//Render:
const LoginForm = ({ handleSubmit, userLogin, notifier }) => {

    /*
        the setHasErrors state is responsible for rendering the verification error when the user does not input user/pass or if the verification details are incorrect.

        The renderLoading state is responsible for rendering the loading screen after login details are submitted.

    */

    const [ hasErrors, setHasErrors ] = useState(null);
    const [ renderLoading, setRenderLoading ] = useState(null);

    const dispatchFormValues = formValues => {
        if (!formValues.email || !formValues.password) {

            // If the user doesn't provide an email or password, immediately render verification error.
            return setHasErrors(true);
        } else {
            setRenderLoading(true);

            //Show the loading page for 5 seconds on purpose.
            setTimeout(() => {
                //Dispatch the user's details to the userLogin action creator. When a response is returned, then an 'errorFlag' value should be returned from the action creator. If the errorFlag is true, then verification error should show and loadingPage is unmounted.
                userLogin(formValues, notifier)
                .then(errorFlag => {
                    setHasErrors(errorFlag);

                    if (errorFlag === true) {
                        setRenderLoading(false);
                    }
                });
            }, 3500)
        }
    }

    const renderErrorText = () => {
        //This function renders the same verification error text, but with different opacities according to the hasErrors state.
        if(hasErrors === true) {
            return (
                <Fade>
                    <ErrorTextVisible>Your verification details were incorrect.</ErrorTextVisible>
                </Fade>

            )
        } else {
            return (
                <ErrorTextInvisible>Your verification details were incorrect.</ErrorTextInvisible>
            )
        }
    }


    return (
        <>
            <LoadingPage
                renderLoading={ renderLoading }
            />
            <BackgroundWrapper>
                <MainContainer>
                    <MainHeader>Login</MainHeader>
                    <BrowserView>
                        <SecondaryHeader>Please verify your credentials to continue...</SecondaryHeader>
                    </BrowserView>
                    <MobileView>
                        <SecondaryHeader>It looks like you're on a mobile device. Unfortunately, Petri is currently not compatible with mobile devices. Please use Petri on your desktop or tablet.</SecondaryHeader>
                    </MobileView>
                    <div>
                        <form onSubmit={handleSubmit(dispatchFormValues)}>
                            {renderErrorText()}
                            <InputFieldContainer>
                                <StyledLabel>Email Address</StyledLabel>
                                <StyledField name='email' component='input'></StyledField>
                            </InputFieldContainer>
                            <InputFieldContainer>
                                <StyledLabel>Password</StyledLabel>
                                <StyledField name='password' component='input' type='password'></StyledField>
                            </InputFieldContainer>
                            <InputFieldContainer>
                                <BrowserView>
                                    <StyledButton type='submit'>Login</StyledButton>
                                </BrowserView>
                                <MobileView>
                                    <Button variant='contained' disabled style={{ width: '100%'}}>
                                         Please Login using other device
                                    </Button>
                                </MobileView>
                            </InputFieldContainer>
                        </form>
                    </div>
                </MainContainer>
            </BackgroundWrapper>
        </>
    )
}

//Connections:

const reduxLoginForm = connect(null, { userLogin })(LoginForm);

export default reduxForm({
    form: 'loginForm'
})(reduxLoginForm);