import React, { useState } from 'react';
import styled from 'styled-components';
import EmailValidator from 'email-validator';

import { connect } from 'react-redux';
import {
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
} from '../../../../redux/userSettings/UserSettingActions';

//Components:

import SettingsInputTextField from './SettingsInputTextField';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:

export const MainContainer = styled.div`
    background-color: ${(props) => props.theme.settingsMainContainerBG};
    /* background-color: salmon; */
`;

export const FormHeader = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1.4em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 1;
    margin-bottom: 2rem;
`;

export const FormContainer = styled.div``;

export const TextFieldContainer = styled.div`
    margin: 1rem 0;
`;

export const ButtonContainer = styled.div`
    margin-top: 2rem;
`;

export const ButtonSpacer = styled.div`
    display: inline-block;
    width: 1rem;
`;

const ProfileButtonContainer = styled.div`
    float: right;
`;

//Interface dispatch props
interface IDispatchProps {
    userChangeEmailAddress: (
        value: string,
        callback: (message: string) => void
    ) => void;
    userChangeFirstName: (
        value: string,
        callback: (message: string) => void
    ) => void;
    userChangeLastName: (
        value: string,
        callback: (message: string) => void
    ) => void;
    userChangeUserName: (
        value: string,
        callback: (message: string) => void
    ) => void;
}

//Interface props
interface IProfileDetails {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    snackbar: (message: string) => void;
}

type ProfileDetailsProps = IProfileDetails & IDispatchProps;

const ProfileDetails = ({
    firstName,
    lastName,
    userName,
    email,
    snackbar,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
}: ProfileDetailsProps): JSX.Element => {
    //Form Handler:
    const [userInputDetails, setUserInputDetails] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    });

    const [allInputError, setAllInputError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //Form event handler:
    const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Reset input errors (if any) on press:
        if (allInputError === true) setAllInputError(false);
        if (emailError === true) setEmailError(false);

        const val = e.target.value;

        setUserInputDetails({
            ...userInputDetails,
            [e.target.name]: val,
        });
    };

    //Object empty checker:
    const isObjectEmpty = (obj: {}) => {
        for (const key in obj) {
            if (obj[key] !== '' && obj[key] !== null) {
                return false;
            }
        }

        return true;
    };

    //Form submission handler:

    const submitUserDetailChange = () => {
        //Check if the state object is all empty strings:
        const stateStatus = isObjectEmpty(userInputDetails);

        if (stateStatus === true) {
            setAllInputError(true);
            setEmailError(true);
            return;
        }

        //Check if valid email:

        if (userInputDetails.email !== '') {
            const emailStatus = EmailValidator.validate(userInputDetails.email);

            if (emailStatus === false) {
                setEmailError(true);
                return;
            }
        }

        //Loop through all keys in userInputDetails, identify non-empty values

        for (const key in userInputDetails) {
            if (
                userInputDetails[key] !== '' &&
                userInputDetails[key] !== null
            ) {
                console.log(key);
                inputSubmissionParser(key);
            }
        }
    };

    const resetUserSubmission = (detail: string) => {
        setUserInputDetails({
            ...userInputDetails,
            [detail]: '',
        });
    };

    const inputSubmissionParser = (detail: string) => {
        if (detail) {
            switch (detail) {
                case 'firstName':
                    userChangeFirstName(userInputDetails.firstName, snackbar);
                    resetUserSubmission(detail);
                    break;
                case 'userName':
                    userChangeUserName(userInputDetails.userName, snackbar);
                    resetUserSubmission(detail);
                    break;
                case 'lastName':
                    userChangeLastName(userInputDetails.lastName, snackbar);
                    resetUserSubmission(detail);
                    break;
                case 'email':
                    userChangeEmailAddress(userInputDetails.email, snackbar);
                    resetUserSubmission(detail);
                    break;
                default:
                    return new Error(
                        'No submission detail was specified. Change request not processed.'
                    );
            }
        }
    };

    const resetAllUserSubmissions = () => {
        setUserInputDetails({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
        });
    };

    return (
        <MainContainer>
            <FormHeader>Personal Details</FormHeader>
            <FormContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="firstName"
                        label="First name"
                        placeholder={firstName}
                        onChange={handleUserDetailChange}
                        hasError={allInputError}
                        value={userInputDetails.firstName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="lastName"
                        label="Last name"
                        placeholder={lastName}
                        onChange={handleUserDetailChange}
                        hasError={allInputError}
                        value={userInputDetails.lastName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="userName"
                        label="Username"
                        placeholder={userName}
                        onChange={handleUserDetailChange}
                        hasError={allInputError}
                        value={userInputDetails.userName}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="email"
                        label="Email Address - This will change your log in credentials!"
                        placeholder={email}
                        onChange={handleUserDetailChange}
                        type="email"
                        hasError={emailError}
                        value={userInputDetails.email}
                    />
                </TextFieldContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel="Update"
                    onClick={submitUserDetailChange}
                />
                <ButtonSpacer />
                <GeneralButton
                    buttonLabel="Reset"
                    buttonBackground="rgba(0, 0, 34, 0.1)"
                    buttonTextColor="rgba(0, 0, 34, 0.7)"
                    onClick={resetAllUserSubmissions}
                />
                <ButtonSpacer />
                <ProfileButtonContainer>
                    <GeneralButton buttonLabel="Change Profile Picture" />
                </ProfileButtonContainer>
            </ButtonContainer>
        </MainContainer>
    );
};

export default connect(null, {
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
})(ProfileDetails);
