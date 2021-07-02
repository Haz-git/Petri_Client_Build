import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import TextField from '@material-ui/core/TextField';
import {
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
} from '../../../redux/userSettings/UserSettingActions';

//Components:
import PageHeader from '../general_components/PageHeader';

//temp:
import ProfileDetails from './settings_components/ProfileDetails';

//Dark Mode Option:
import { useDarkMode } from '../../Styling/useDarkMode';
import Toggler from '../../../components/Styling/Toggler';

//Styles:
import Button from '@material-ui/core/Button';
import { Save } from '@styled-icons/entypo/Save';
import defaultAvatar from '../../../Img/default_avatar.png';
import Badge from '@material-ui/core/Badge';
import Fade from 'react-reveal/Fade';

const PageHeaderContainer = styled.div`
    padding: 1rem 1rem;
    margin: 1rem 1rem;
`;

const MainContainer = styled.div`
    /* margin: 30px auto; */
    margin: 1rem 2rem;
    /* height: fit-content; */
    max-width: 60rem;
    background-color: ${(props) => props.theme.settingsMainContainerBG};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: all 0.5s linear;
    border-radius: 0.5em;
    /* padding: 1rem 1rem; */
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 4fr;
`;

const LinkContainer = styled.div`
    border-right: 3px solid #f8f8ff;
    /* padding: 1rem 1rem; */
    display: flex;
    flex-direction: column;
`;

const LinkButton = styled.button`
    border-bottom: 3px solid #f8f8ff;
    text-align: center;
    padding: 1.5rem 0;
    background-color: white;
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 0.7;

    &:focus {
        outline: 0;
    }
`;

const FormContainer = styled.div`
    padding: 2rem 4rem;
`;

const MainGridContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
`;

const ProfileImageContainer = styled.div`
    text-align: center;
    /* margin-top: 20px; */
    border-bottom: 3px solid #f8f8ff;
`;

const StyledCustomAvatar = styled.img`
    height: 200px;
    width: 200px;
    padding: 1rem 1rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid ${(props) => props.theme.settingsAvatarBorderC};
`;

const StyledDefaultAvatar = styled.img`
    height: 200px;
    width: 200px;
    padding: 1rem 1rem;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid white;
`;

const AvatarName = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 900;
    color: ${(props) => props.theme.text};
    opacity: 1;
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

//This interface represents the state slices returned by mapStateToProps
interface IMapStateToProps {
    userData: any;
    userSettings: any;
}

//This interface represents the dispatch props (or functions in this case)
interface IDispatchProps {
    userGetProfilePicture: () => void;
    userChangeEmailAddress: (value: string) => void;
    userChangeFirstName: (value: string) => void;
    userChangeLastName: (value: string) => void;
    userChangeUserName: (value: string) => void;
}

//This interface represents UserSetting's own props that are not dispatch or state from redux.
interface IUserSettings {
    modeStatus: (modeValue: string) => void;
}

type ComponentProps = IDispatchProps & IUserSettings & IMapStateToProps;

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
}: ComponentProps): JSX.Element => {
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

    const renderUserImage = () => {
        if (
            userSettings.userSettings.profileImg.url !== undefined &&
            userSettings.userSettings.profileImg.url !== null
        ) {
            return (
                <StyledCustomAvatar
                    src={userSettings.userSettings.profileImg.url}
                />
            );
        } else {
            return <StyledDefaultAvatar src={defaultAvatar} />;
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
            <PageHeaderContainer>
                <PageHeader
                    headerTitle="Settings"
                    headerDesc="Change your profile and account settings"
                />
            </PageHeaderContainer>
            <MainContainer>
                <ContentWrapper>
                    <LinkContainer>
                        <ProfileImageContainer>
                            {/* <Link
                            to={`settings/editProfilePicture/${userData._id}`}
                        > */}
                            {renderUserImage()}
                            {/* </Link> */}
                            <AvatarName>
                                {userData.firstName + ' ' + userData.lastName}
                            </AvatarName>
                        </ProfileImageContainer>
                        <LinkButton>User Profile</LinkButton>
                        <LinkButton>Password</LinkButton>
                        <LinkButton>Security & Privacy</LinkButton>
                        <LinkButton>Upgrade</LinkButton>
                    </LinkContainer>
                    <FormContainer>
                        <ProfileDetails
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            userName={userData.userName}
                            email={userData.email}
                        />
                    </FormContainer>
                </ContentWrapper>

                {/* <MainGridContainer>
                    <div>
                        <TextFieldContainer>
                            <TextFieldInput
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
                            <TextFieldInput
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
                            <TextFieldInput
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
                            <Toggler
                                theme={theme}
                                toggleTheme={toggleTheme}
                                callBack={modeStatus}
                            />
                        </TextFieldContainer>
                    </div>
                    <div>
                        <TextFieldContainer>
                            <TextFieldInput
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
                            <TextFieldInput
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
                            <TextFieldInput
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
                </MainGridContainer> */}
            </MainContainer>
        </>
    );
};

/*
Notes:

Profile Picture and avatar should use implementation of both react-avatar-editor and react-dropzone.
https://www.npmjs.com/package/react-avatar-editor
https://react-dropzone.js.org/


*/

const mapStateToProps = (state: IMapStateToProps, ownProps: IUserSettings) => {
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
