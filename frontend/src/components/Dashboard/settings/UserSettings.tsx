import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import {
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
} from '../../../redux/userSettings/UserSettingActions';

//Dark Mode Option:
import { useDarkMode } from '../../Styling/useDarkMode';
import Toggler from '../../../components/Styling/Toggler';

//Styles:
import Button from '@material-ui/core/Button';
import { Save } from '@styled-icons/entypo/Save';
import defaultAvatar from '../../../Img/default_avatar.png';
import Badge from '@material-ui/core/Badge';
import Fade from 'react-reveal/Fade';

const MainSettingsHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: ${(props) => props.theme.settingsHeaderBG};
    height: 85px;
    border-left: 1px solid #f6f9fc;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 1px 1px rgba(0, 0, 0, 0.048), 0 2px 2px rgba(0, 0, 0, 0.06),
        0 3px 3px rgba(0, 0, 0, 0.072), 0 3px 4px rgba(0, 0, 0, 0.086),
        0 2px 1px rgba(0, 0, 0, 0.12); ;
`;

const BackgroundContainer = styled.div`
    height: 100vh;
    overflow-y: hidden;
    background-color: ${(props) => props.theme.settingsBackgroundContainer};
    transition: all 0.5s linear;
`;

const MainContainer = styled.div`
    margin: 30px auto;
    height: fit-content;
    background-color: ${(props) => props.theme.settingsMainContainerBG};
    width: 950px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 60px 40px rgba(0, 0, 0, 0.12);
    transition: all 0.5s linear;
    border-radius: 20px;
    padding: 30px 20px;
`;

const MainGridContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
`;

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: ${(props) => props.theme.settingsMainHeaderTextC};
`;
const ProfileImageContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const StyledCustomAvatar = styled.img`
    height: 220px;
    width: 220px;
    border-radius: 50%;
    vertical-align: middle;
    border: 5px solid ${(props) => props.theme.settingsAvatarBorderC};
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 60px 40px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s;
    transition: all 0.5s linear;

    &:hover {
        transform: scale(1.1);
    }
`;

const StyledDefaultAvatar = styled.img`
    height: 220px;
    width: 220px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 5px solid white;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 60px 40px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
`;

const SaveIcon = styled(Save)`
    height: 23px;
    width: 23px;
`;

const TextFieldContainer = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
`;
const ButtonRevealContainer = styled.div`
    position: absolute;
    margin-left: 10px;
`;

//Render:

const UserSettings = ({
    userData,
    userSettings,
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
    modeStatus,
}) => {
    useEffect(() => {
        userGetProfilePicture();
    }, []);

    //Dark Mode Toggler:
    const [theme, toggleTheme] = useDarkMode();

    //Form Handler Consolidated:

    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    });

    const handleUserDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        setState({
            ...state,
            [e.target.name]: val,
        });
    };

    console.log(state);

    const renderUserImage = () => {
        if (
            userSettings.userSettings.profileImg.url !== undefined &&
            userSettings.userSettings.profileImg.url !== null
        ) {
            return (
                <Badge badgeContent={'Edit'} overlap="circle" color="secondary">
                    <StyledCustomAvatar
                        src={userSettings.userSettings.profileImg.url}
                    />
                </Badge>
            );
        } else {
            return (
                <Badge badgeContent={'Edit'} overlap="circle" color="secondary">
                    <StyledDefaultAvatar src={defaultAvatar} />
                </Badge>
            );
        }
    };

    enum ChangeDetails {
        CHANGE_FIRSTNAME = 'CHANGE_FIRSTNAME',
        CHANGE_USERNAME = 'CHANGE_USERNAME',
        CHANGE_LASTNAME = 'CHANGE_LASTNAME',
        CHANGE_EMAILADDRESS = 'CHANGE_EMAILADDRESS',
    }

    const submitUserDetailChange = (detail: string) => {
        if (detail) {
            switch (detail) {
                case ChangeDetails.CHANGE_FIRSTNAME:
                    return userChangeFirstName(state.firstName);
                case ChangeDetails.CHANGE_USERNAME:
                    return userChangeUserName(state.userName);
                case ChangeDetails.CHANGE_LASTNAME:
                    return userChangeLastName(state.lastName);
                case ChangeDetails.CHANGE_EMAILADDRESS:
                    return userChangeEmailAddress(state.email);
                default:
                    return new Error(
                        'No submission detail was specified. Change request not processed.'
                    );
            }
        }
    };

    const renderSubmitButton = (buttonValue: string, detail: string) => {
        if (buttonValue.trim() !== '') {
            return (
                <Fade>
                    <ButtonRevealContainer>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => submitUserDetailChange(detail)}
                        >
                            Save
                        </Button>
                    </ButtonRevealContainer>
                </Fade>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <BackgroundContainer>
                <MainSettingsHeaderContainer>
                    <StyledMainHeader>Your Settings</StyledMainHeader>
                </MainSettingsHeaderContainer>
                <MainContainer>
                    <ProfileImageContainer>
                        <Link
                            to={`settings/editProfilePicture/${userData._id}`}
                        >
                            {renderUserImage()}
                        </Link>
                    </ProfileImageContainer>
                    <MainGridContainer>
                        <div>
                            <TextFieldContainer>
                                <TextField
                                    name="firstName"
                                    id="outlined-required"
                                    label="First Name"
                                    variant="outlined"
                                    placeholder={`${userData.firstName}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleUserDetailChange}
                                />
                                {renderSubmitButton(
                                    state.firstName,
                                    ChangeDetails.CHANGE_FIRSTNAME
                                )}
                            </TextFieldContainer>
                            <TextFieldContainer>
                                <TextField
                                    name="userName"
                                    id="outlined-required"
                                    label="Username"
                                    variant="outlined"
                                    placeholder={`${userData.userName}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleUserDetailChange}
                                />
                                {renderSubmitButton(
                                    state.userName,
                                    ChangeDetails.CHANGE_USERNAME
                                )}
                            </TextFieldContainer>
                            <TextFieldContainer>
                                <TextField
                                    disabled
                                    id="outlined-required"
                                    label="Role"
                                    variant="outlined"
                                    placeholder="Basic-User"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TextFieldContainer>
                            <TextFieldContainer>
                                {/* <Toggler
                                    theme={theme}
                                    toggleTheme={toggleTheme}
                                    callBack={modeStatus}
                                /> */}
                            </TextFieldContainer>
                        </div>
                        <div>
                            <TextFieldContainer>
                                <TextField
                                    name="lastName"
                                    id="outlined-required"
                                    label="Last Name"
                                    variant="outlined"
                                    placeholder={`${userData.lastName}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleUserDetailChange}
                                />
                                {renderSubmitButton(
                                    state.lastName,
                                    ChangeDetails.CHANGE_LASTNAME
                                )}
                            </TextFieldContainer>
                            <TextFieldContainer>
                                <TextField
                                    disabled
                                    id="outlined-required"
                                    label="Title"
                                    variant="outlined"
                                    placeholder="Researcher"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TextFieldContainer>
                            <TextFieldContainer>
                                <TextField
                                    name="email"
                                    id="outlined-required"
                                    label="Email Address"
                                    variant="outlined"
                                    placeholder={`${userData.email}`}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText="Changes log in credentials!"
                                    onChange={handleUserDetailChange}
                                />
                                {renderSubmitButton(
                                    state.email,
                                    ChangeDetails.CHANGE_EMAILADDRESS
                                )}
                            </TextFieldContainer>
                        </div>
                    </MainGridContainer>
                </MainContainer>
            </BackgroundContainer>
        </>
    );
};

/*
Notes:

Profile Picture and avatar should use implementation of both react-avatar-editor and react-dropzone.
https://www.npmjs.com/package/react-avatar-editor
https://react-dropzone.js.org/


*/

const mapStateToProps = (state) => {
    return {
        userData: state.userSettings.userSettings,
        userSettings: state.userSettings,
    };
};

export default connect(mapStateToProps, {
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
})(UserSettings);
