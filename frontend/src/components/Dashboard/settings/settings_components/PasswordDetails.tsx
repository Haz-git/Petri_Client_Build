import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

//Components:

import { userChangePassword } from '../../../../redux/userSettings/UserSettingActions';

import {
    MainContainer,
    FormHeader,
    FormContainer,
    TextFieldContainer,
    ButtonContainer,
    ButtonSpacer,
} from './ProfileDetails';
import SettingsInputTextField from './SettingsInputTextField';
import GeneralButton from '../../general_components/GeneralButton';
import ErrorText from '../settings_components/ErrorText';

//Styles:

//Interfaces:

interface IDispatchProps {
    userChangePassword: (
        newPassword: string,
        newPasswordConfirm: string,
        currentPassword: string,
        snackbarCallback: (message: string) => void,
        btnCallback: (status: boolean) => void,
        errorCallback: (status: boolean, message: string) => void
    ) => void;
}

interface IPasswordDetails {
    snackbar: (message: string) => void;
}

type PasswordDetailsProps = IDispatchProps & IPasswordDetails;

const PasswordDetails = ({
    userChangePassword,
    snackbar,
}: PasswordDetailsProps): JSX.Element => {
    //Form Handler:
    const [userInputPasswords, setUserInputPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    });

    //Error Text State:
    const [showErrorText, setShowErrorText] = useState(false);
    const [errorDesc, setErrorDesc] = useState('');

    //All input error handler:
    const [allInputError, setAllInputError] = useState(false);

    //Matching password Error state:
    const [matchPassError, setMatchPassError] = useState(false);

    //Button State:
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    //Button State Handler:
    const setButtonState = (status: boolean) => {
        setIsButtonLoading(status);
    };

    //Curr password error state handler:
    const setCurrPasswordState = (status: boolean, message: string) => {
        setAllInputError(status);
        setShowErrorText(status);
        setErrorDesc(message);
    };

    //Form event handler:
    const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Reset input errors (if any) on press:
        if (allInputError === true) setAllInputError(false);
        if (matchPassError === true) setMatchPassError(false);
        if (showErrorText === true) {
            setShowErrorText(false);
            setErrorDesc('.');
        }

        const val = e.target.value;

        setUserInputPasswords({
            ...userInputPasswords,
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

    //Clears all recent user detail change input bar:
    const resetAllUserSubmissions = () => {
        //Reset input errors (if any) on press:
        if (allInputError === true) setAllInputError(false);
        if (matchPassError === true) setMatchPassError(false);
        if (showErrorText === true) {
            setShowErrorText(false);
            setErrorDesc('.');
        }

        setUserInputPasswords({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        });
    };

    //Checks is newPassword and newPasswordConfirm is identical:
    const isPasswordSame = (p1, p2) => {
        return p1.trim().normalize() === p2.trim().normalize();
    };

    //Checks if password adheres to user model rules (6 < password < 20):
    const checkPasswordLength = (password) => {
        let length = password.trim().length;

        if (length >= 6 && length <= 20) {
            return true;
        } else {
            return false;
        }
    };

    //Handles password submission:
    const submitUserPasswordChange = () => {
        //Set Button State to load to avoid all subsequent requests:
        setButtonState(true);

        //Check if the state object is all empty strings:
        const stateStatus = isObjectEmpty(userInputPasswords);

        if (stateStatus === true) {
            setAllInputError(true);
            setMatchPassError(true);
            setButtonState(false);
            setErrorDesc(
                'Please fill in all the fields to change your password.'
            );
            setShowErrorText(true);
            return;
        }

        const { newPassword, newPasswordConfirm, currentPassword } =
            userInputPasswords;

        if (checkPasswordLength(newPassword) !== true) {
            setMatchPassError(true);
            setButtonState(false);
            setErrorDesc(
                'Your new password must be greater than 6 characters and less than 20 characters.'
            );
            setShowErrorText(true);
            return;
        }

        const samePassword = isPasswordSame(newPassword, newPasswordConfirm);

        if (samePassword === true) {
            userChangePassword(
                newPassword,
                newPasswordConfirm,
                currentPassword,
                snackbar,
                setButtonState,
                setCurrPasswordState
            );

            resetAllUserSubmissions();
        } else {
            setMatchPassError(true);
            setButtonState(false);
            setErrorDesc('Your new passwords do not match.');
            setShowErrorText(true);
        }
    };

    return (
        <MainContainer>
            <FormHeader>Password Management</FormHeader>
            <ErrorText desc={errorDesc} isShown={showErrorText} />
            <FormContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="currentPassword"
                        label="Current password"
                        type="password"
                        onChange={handleUserDetailChange}
                        hasError={allInputError}
                        value={userInputPasswords.currentPassword}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="newPassword"
                        label="New password"
                        type="password"
                        onChange={handleUserDetailChange}
                        hasError={matchPassError}
                        value={userInputPasswords.newPassword}
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="newPasswordConfirm"
                        label="Confirm new password"
                        type="password"
                        onChange={handleUserDetailChange}
                        hasError={matchPassError}
                        value={userInputPasswords.newPasswordConfirm}
                    />
                </TextFieldContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton
                    buttonLabel={
                        isButtonLoading === false ? 'Update' : 'Updating...'
                    }
                    onClick={submitUserPasswordChange}
                    isDisabledOnLoading={isButtonLoading}
                />
                <ButtonSpacer />
                <GeneralButton
                    buttonLabel="Reset"
                    buttonBackground="rgba(0, 0, 34, 0.1)"
                    buttonTextColor="rgba(5, 5, 20, 0.7)"
                    onClick={resetAllUserSubmissions}
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default connect(null, { userChangePassword })(PasswordDetails);
