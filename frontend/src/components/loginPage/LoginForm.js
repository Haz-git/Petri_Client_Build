import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import userLogin from '../../redux/userLogin/userLoginActions';
import Fade from 'react-reveal/Fade';
import history from '../../historyObject';

import LoadingPage from '../LoadingPage';

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
`



const ErrorTextInvisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 15px;
    font-weight: 100;
    opacity: 0;
`

const ErrorTextVisible = styled.h2`
    font-family: 'Nunito', sans-serif;
    color: red;
    font-size: 15px;
    font-weight: 100;
`


//Render:
const LoginForm = ({ handleSubmit, userLogin, notifier }) => {

    const [ hasErrors, setHasErrors ] = useState(null);
    const [ renderLoading, setRenderLoading ] = useState(null);

    const dispatchFormValues = formValues => {
        if (!formValues.email || !formValues.password) {
            return setHasErrors(true);
        } else {
            setRenderLoading(true);
            
            setTimeout(() => {

                userLogin(formValues, notifier)
                .then(errorFlag => {
                    setHasErrors(errorFlag);

                    if (errorFlag === true) {
                        setRenderLoading(false);
                    }
                });
            }, 5000)
        }
    }

    const renderErrorText = () => {
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
                    <MainHeader>Hey, there!</MainHeader>
                    <SecondaryHeader>Please log in to continue...</SecondaryHeader>
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
                                <StyledButton type='submit'>Login</StyledButton>
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