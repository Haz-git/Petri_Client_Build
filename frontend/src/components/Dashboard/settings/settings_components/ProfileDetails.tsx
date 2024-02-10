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
import ErrorText from './ErrorText';
import Toggler from '../../../../components/Styling/Toggler';

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
    margin-bottom: 0.5rem;
`;

export const FormContainer = styled.div``;

export const TextFieldContainer = styled.div`
    margin: 1rem 0;
`;

export const ButtonContainer = styled.div`
    position: relative;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const ButtonDivider = styled.div`
    max-width: 20rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
`;

export const ButtonSpacer = styled.div`
    display: inline-block;
    width: 1rem;
`;

//Interface dispatch props
interface IDispatchProps {
    userChangeEmailAddress: (
        value: string,
        snackbar: (message: string) => void,
        callback: (status: boolean) => void
    ) => void;
    userChangeFirstName: (
        value: string,
        snackbar: (message: string) => void,
        callback: (status: boolean) => void
    ) => void;
    userChangeLastName: (
        value: string,
        snackbar: (message: string) => void,
        callback: (status: boolean) => void
    ) => void;
    userChangeUserName: (
        value: string,
        snackbar: (message: string) => void,
        callback: (status: boolean) => void
    ) => void;
}

//Interface props
interface IProfileDetails {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    snackbar: (message: string) => void;
    openProfilePicModal: () => void;
}

type ProfileDetailsProps = IProfileDetails & IDispatchProps;

const ProfileDetails = ({
    firstName,
    lastName,
    userName,
    email,
    snackbar,
    openProfilePicModal,
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

    //Error text state:
    const [showErrorText, setShowErrorText] = useState(false);
    const [errorDesc, setErrorDesc] = useState('');

    //Button State:
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    //Button State Handler:
    const setButtonState = (status: boolean) => {
        setIsButtonLoading(status);
    };

    const [allInputError, setAllInputError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //Form event handler:
    const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Reset input errors (if any) on press:
        if (allInputError === true) setAllInputError(false);
        if (emailError === true) setEmailError(false);
        if (showErrorText === true) {
            setShowErrorText(false);
            setErrorDesc('.');
        }

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
        //Set Button State to load to avoid all subsequent requests:
        setButtonState(true);

        //Check if the state object is all empty strings:
        const stateStatus = isObjectEmpty(userInputDetails);

        if (stateStatus === true) {
            setAllInputError(true);
            setEmailError(true);
            setButtonState(false);
            setErrorDesc('Please change atleast one value prior to updating.');
            setShowErrorText(true);
            return;
        }

        //Check if valid email:

        if (userInputDetails.email !== '') {
            const emailStatus = EmailValidator.validate(userInputDetails.email);

            if (emailStatus === false) {
                setEmailError(true);
                setButtonState(false);
                setErrorDesc(
                    'Your new email address is not valid. Please try again.'
                );
                setShowErrorText(true);
                return;
            }
        }

        //Loop through all keys in userInputDetails, identify non-empty values

        for (const key in userInputDetails) {
            if (userInputDetails[key] !== '') {
                inputSubmissionParser(key);
            }
        }

        //After looping, reset all user submissions, in case.
        resetAllUserSubmissions();
    };

    //Checks if user wants to change to already existing name:

    const isSameInput = (type: string) => {
        if (type) {
            switch (type) {
                case 'firstName':
                    if (userInputDetails.firstName === firstName) return true;
                    break;
                case 'lastName':
                    if (userInputDetails.lastName === lastName) return true;
                    break;
                case 'userName':
                    if (userInputDetails.userName === userName) return true;
                    break;
                case 'email':
                    if (userInputDetails.email === firstName) return true;
            }
        }
    };

    //Handles submission:

    const inputSubmissionParser = (detail: string) => {
        if (detail) {
            switch (detail) {
                case 'firstName':
                    if (isSameInput(detail) !== true) {
                        userChangeFirstName(
                            userInputDetails.firstName,
                            snackbar,
                            setButtonState
                        );
                    } else {
                        setButtonState(false);
                        setErrorDesc(
                            'You cannot change to your pre-existing first name.'
                        );
                        setShowErrorText(true);
                    }

                    break;
                case 'userName':
                    if (isSameInput(detail) !== true) {
                        userChangeUserName(
                            userInputDetails.userName,
                            snackbar,
                            setButtonState
                        );
                    } else {
                        setButtonState(false);
                        setErrorDesc(
                            'You cannot change to your pre-existing username.'
                        );
                        setShowErrorText(true);
                    }
                    break;
                case 'lastName':
                    if (isSameInput(detail) !== true) {
                        userChangeLastName(
                            userInputDetails.lastName,
                            snackbar,
                            setButtonState
                        );
                    } else {
                        setButtonState(false);
                        setErrorDesc(
                            'You cannot change to your pre-existing last name.'
                        );
                        setShowErrorText(true);
                    }
                    break;
                case 'email':
                    if (isSameInput(detail) !== true) {
                        userChangeEmailAddress(
                            userInputDetails.email,
                            snackbar,
                            setButtonState
                        );
                    } else {
                        setButtonState(false);
                        setErrorDesc(
                            'You cannot change to your pre-existing email address.'
                        );
                        setShowErrorText(true);
                    }
                    break;
                default:
                    return new Error(
                        'No submission detail was specified. Change request not processed.'
                    );
            }
        }
    };

    const resetAllUserSubmissions = () => {
        if (allInputError === true) setAllInputError(false);
        if (emailError === true) setEmailError(false);
        if (showErrorText === true) {
            setShowErrorText(false);
            setErrorDesc('.');
        }
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
            <ErrorText desc={errorDesc} isShown={showErrorText} />
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
                <ButtonDivider>
                    <GeneralButton
                        buttonLabel={
                            isButtonLoading === false ? 'Update' : 'Updating...'
                        }
                        onClick={submitUserDetailChange}
                        isDisabledOnLoading={isButtonLoading}
                    />
                </ButtonDivider>
                <ButtonDivider>
                    <GeneralButton
                        buttonLabel="Reset"
                        buttonBackground="rgba(0, 0, 34, 0.1)"
                        buttonTextColor="rgba(5, 5, 20, 0.7)"
                        onClick={resetAllUserSubmissions}
                    />
                </ButtonDivider>
                <ButtonDivider>
                    <GeneralButton
                        buttonLabel="Change Profile Picture"
                        onClick={openProfilePicModal}
                    />
                </ButtonDivider>
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
