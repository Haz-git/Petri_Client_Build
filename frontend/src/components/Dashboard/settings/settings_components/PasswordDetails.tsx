import React from 'react';
import styled from 'styled-components';

//Components:

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

//Styles:

//Interface:

const PasswordDetails = () => {
    return (
        <MainContainer>
            <FormHeader>Password Management</FormHeader>
            <FormContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="currentPassword"
                        label="Current password"
                        type="password"
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="newPassword"
                        label="New password"
                        type="password"
                    />
                </TextFieldContainer>
                <TextFieldContainer>
                    <SettingsInputTextField
                        name="newPasswordConfirm"
                        label="Confirm new password"
                        type="password"
                    />
                </TextFieldContainer>
            </FormContainer>
            <ButtonContainer>
                <GeneralButton buttonLabel="Update Password" />
                <ButtonSpacer />
                <GeneralButton
                    buttonLabel="Reset"
                    buttonBackground="rgba(0, 0, 34, 0.1)"
                    buttonTextColor="rgba(0, 0, 34, 0.7)"
                />
            </ButtonContainer>
        </MainContainer>
    );
};

export default PasswordDetails;
