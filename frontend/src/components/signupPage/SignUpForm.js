import React from 'react';
import styled from 'styled-components';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import userSignUp from '../../redux/userSignUp/userSignUpActions';
import signupImg from '../../Img/signupImg.jpg';

//Styles:

const MainContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    background-color:#F6F9FC;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
`

const ContentContainer = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 45% 55%;
    background-color:#F6F9FC;
    text-align: center;
    width: 100%;
    max-height: 100px;

 
`
const HeaderContainer = styled.div`
    /* background-color: salmon; */
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #F6F9FC;
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
`
export const SecondaryHeader = styled.h2`
    margin: 0;
    font-size: 22px;
    padding: 10px 10px;
    font-weight: 500;
    color: #293241;
    font-family: 'Catamaran', sans-serif;
`

const ThirdHeader = styled.h3`
    margin: 0;
    font-size: 17px;
    padding-top: 30px;
    font-family: 'Catamaran', sans-serif;
    font-weight: 300;
    color: #293241;
`

const FormContainer = styled.div`
    flex-grow: 1;
    text-align: center;
    /* background-color: lightblue; */
    padding-left: 80px;
    padding-right: 80px;
    background-color: #F6F9FC;
`

const ImageContainer = styled.div`
    flex-grow: 1;
    /* background-color: navy; */
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    background-color: #F6F9FC;
`

export const StyledField = styled(Field)`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
`

export const StyledLabel = styled.label`
    font-family: 'Nunito', sans-serif, Helvetica;
    font-weight: 300;
    font-size: 17px;
`

const InputContainer = styled.div`
    padding-top: 50px;
`

export const InputFieldContainer = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
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
`



//Render:
const SignUpForm = ({ handleSubmit, userSignUp }) => {

    const dispatchFormValues = formValues => {
        userSignUp(formValues);
    }

    return (
        <>
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
        </>
    )
}

//Connection to Redux, Redux-form:

const reduxSignUpForm = connect(null, { userSignUp })(SignUpForm);

export default reduxForm({
    form: 'SignUpForm'
})(reduxSignUpForm);