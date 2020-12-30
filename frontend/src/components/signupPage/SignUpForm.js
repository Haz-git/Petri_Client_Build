import React from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import userSignUp from '../../redux/userSignUp/userSignUpActions';
import signupImg from '../../Img/signupImg.jpg';

//Styles:

const BackgroundWrapper = styled.div`
    height: 100%;
    background-color: #F6F9FC;
`

const MainContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    background-color:#F6F9FC;
`

const ContentContainer = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 45% 55%;
    background-color:#F6F9FC;
    text-align: center;
    width: 100%;
    max-height: 100px;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        display: block;
    }
 
`
const HeaderContainer = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #F6F9FC;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding: 5px 5px;
    }
`

export const MainHeader = styled.h1`
    margin: 0;
    font-weight: 900;
    font-size: 60px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 30px;
    color: #293241;
    font-family: 'Catamaran', sans-serif;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 30px;
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 15px;
    }
`
export const SecondaryHeader = styled.h2`
    margin: 0;
    font-size: 22px;
    padding: 10px 10px;
    font-weight: 500;
    color: #293241;
    font-family: 'Catamaran', sans-serif;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 13px;
        padding: 0;
    }
`

const ThirdHeader = styled.h3`
    margin: 0;
    font-size: 17px;
    padding-top: 30px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 300;
    color: #293241;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        font-size: 15px;
        font-weight: 500;
        padding-top: 15px;
    }
`

const FormContainer = styled.div`
    flex-grow: 1;
    text-align: center;
    /* background-color: lightblue; */
    padding-left: 80px;
    padding-right: 80px;
    background-color: #F6F9FC;

    @media only screen and (max-width: 650px) {
        padding: 0 25px;
    }

`

const ImageContainer = styled.div`
    flex-grow: 1;
    /* background-color: navy; */
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    background-color: #F6F9FC;

    @media only screen and (max-width: 650px) and (orientation: portrait) {

    }
`

export const StyledField = styled(Field)`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;

    @media only screen and (max-width: 650px) {
        height: 35px;
        margin: 4px 0;
    }
`

export const StyledLabel = styled.label`
    font-family: 'Nunito', sans-serif, Helvetica;
    font-weight: 300;
    font-size: 17px;
    color: #293241;

    @media only screen and (max-width: 650px) {
        font-size: 13px;
    }
`

const InputContainer = styled.div`
    padding-top: 50px;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding-top: 10px;
    }
`

export const InputFieldContainer = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
`

const ButtonContainer = styled.div`
    padding-top: 15px;
    padding-bottom: 10px;
`

export const StyledButton = styled.button`
    background-color: #569a59;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 10px;
    width: 100%;
    font-family: 'Nunito', sans-serif, Helvetica;
`

const StyledImg = styled.img`
    max-width: 100%;
    max-height: 987px;
    object-fit: cover;
    border-radius: 10px;

    @media (min-width: 1700px) {
        max-height: 1100px;
    }

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        max-height: 0;
        max-width: 0;
        border-radius: none;
    }
`



//Render:
const SignUpForm = ({ handleSubmit, userSignUp }) => {

    const dispatchFormValues = formValues => {
        userSignUp(formValues);
    }

    return (
        <>
            <BackgroundWrapper>
                <MainContainer>
                    <ContentContainer>
                        <ImageContainer>
                            <StyledImg src={signupImg}></StyledImg>
                        </ImageContainer>
                        <form onSubmit={handleSubmit(dispatchFormValues)}>
                            <FormContainer>
                                <HeaderContainer>
                                    <MainHeader>Join The Colony</MainHeader>
                                    <SecondaryHeader>Create an account to increase your research workflow by writing bio-note snippets, setting task reminders, and organizing work schedule.</SecondaryHeader>
                                    <ThirdHeader>Already signed up? Login above!</ThirdHeader>
                                </HeaderContainer>
                                    <InputContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>First Name</StyledLabel>
                                            <StyledField name='firstName' component='input'></StyledField>
                                        </InputFieldContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>Last Name</StyledLabel>
                                            <StyledField name='lastName' component='input'></StyledField>
                                        </InputFieldContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>Username</StyledLabel>
                                            <StyledField name='userName' component='input'></StyledField>
                                        </InputFieldContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>Email Address</StyledLabel>
                                            <StyledField name='email' component='input'></StyledField>
                                        </InputFieldContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>Password</StyledLabel>
                                            <StyledField name='password' component='input' type='password'></StyledField>
                                        </InputFieldContainer>
                                        <InputFieldContainer>
                                            <StyledLabel>Confirm Password</StyledLabel>
                                            <StyledField name='passwordConfirm' component='input' type='password'></StyledField>
                                        </InputFieldContainer>
                                    </InputContainer>
                                <ButtonContainer>
                                    <StyledButton type='submit'>Sign Up</StyledButton>
                                </ButtonContainer>
                            </FormContainer>
                        </form>
                    </ContentContainer>
                </MainContainer>
            </BackgroundWrapper>
        </>
    )
}

//Connection to Redux, Redux-form:

const reduxSignUpForm = connect(null, { userSignUp })(SignUpForm);

export default reduxForm({
    form: 'SignUpForm'
})(reduxSignUpForm);