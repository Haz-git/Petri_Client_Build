import React from 'react';
import styled from 'styled-components';
import TextFieldInput from '../../general_components/TextFieldInput';
import SettingsInputTextField from './SettingsInputTextField';

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
    margin-bottom: 2rem;
`;

const FormContainer = styled.div``;

const TextFieldContainer = styled.div`
    margin: 1rem 0;
`;

interface IProfileDetails {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

const ProfileDetails = ({
    firstName,
    lastName,
    userName,
    email,
}: IProfileDetails): JSX.Element => {
    return (
        <MainContainer>
            <FormHeader>Personal Details</FormHeader>
            <FormContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="firstName"
                        label="First name"
                        placeholder={firstName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="lastName"
                        label="Last name"
                        placeholder={lastName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="userName"
                        label="User name"
                        placeholder={userName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="email"
                        label="Email Address - This will change your log in credentials!"
                        placeholder={email}
                    />
                </TextFieldContainer>
            </FormContainer>
        </MainContainer>
    );
};

export default ProfileDetails;
