import React from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import userLogin from '../../redux/userLogin/userLoginActions';

//Styles:
import {
    MainHeader,
    SecondaryHeader,
    StyledField,
    StyledLabel,
    StyledButton,
    InputFieldContainer,
} from '../signupPage/SignUpForm';

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


//Render:
const LoginForm = ({ handleSubmit, userLogin, notifier }) => {

    const dispatchFormValues = formValues => {
        userLogin(formValues, notifier);
    }


    return (
        <>
            <MainContainer>
                <MainHeader>Welcome Back!</MainHeader>
                <SecondaryHeader>Please log in to continue...</SecondaryHeader>
                <div>
                    <form onSubmit={handleSubmit(dispatchFormValues)}>
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
        </>
    )
}

//Connections:

const reduxLoginForm = connect(null, { userLogin })(LoginForm);

export default reduxForm({
    form: 'loginForm'
})(reduxLoginForm);