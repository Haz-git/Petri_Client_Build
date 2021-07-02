import React from 'react';
import styled from 'styled-components';
import TextFieldInput from '../../general_components/TextFieldInput';

//Styles:

const MainContainer = styled.div`
    background-color: ${(props) => props.theme.settingsMainContainerBG};
    /* background-color: salmon; */
`;

const FormHeader = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
`;

const FormContainer = styled.div``;

const TextFieldContainer = styled.div`
    margin: 0.8em 0;
`;

const ProfileDetails = () => {
    return (
        <MainContainer>
            <FormHeader>Personal Details</FormHeader>
            <FormContainer>
                <TextFieldContainer>
                    <TextFieldInput
                        name="firstName"
                        id="outlined-required"
                        label="First Name"
                        variant="outlined"
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <TextFieldInput
                        name="lastName"
                        id="outlined-required"
                        label="Last Name"
                        variant="outlined"
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <TextFieldInput
                        name="userName"
                        id="outlined-required"
                        label="Username"
                        variant="outlined"
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <TextFieldInput
                        name="email"
                        id="outlined-required"
                        label="Email Address"
                        variant="outlined"
                    />
                </TextFieldContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default ProfileDetails;
