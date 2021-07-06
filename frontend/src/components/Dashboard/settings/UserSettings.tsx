import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { userGetProfilePicture } from '../../../redux/userSettings/UserSettingActions';
import { toggleSnackbarOpen } from '../../../redux/snackBar/snackBarActions';

//Components:
import PageHeader from '../general_components/PageHeader';
import Snackbar from '../general_components/Snackbar';

//Wizard form views:
import ProfileDetails from './settings_components/ProfileDetails';
import PasswordDetails from './settings_components/PasswordDetails';

//Dark Mode Option:
import { useDarkMode } from '../../Styling/useDarkMode';
import Toggler from '../../../components/Styling/Toggler';

//Styles:
import { Save } from '@styled-icons/entypo/Save';
import defaultAvatar from '../../../Img/default_avatar.png';

const PageHeaderContainer = styled.div`
    padding: 1rem 1rem;
    margin: 1rem 1rem;
`;

const MainContainer = styled.div`
    margin: 1rem 2rem;
    background-color: ${(props) => props.theme.settingsMainContainerBG};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    transition: all 0.5s linear;
    border-radius: 0.5em;
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 4fr;
`;

const LinkContainer = styled.div`
    border-right: 3px solid #f8f8ff;
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
    toggleSnackbarOpen: (message: string) => void;
}

//This interface represents UserSetting's own props that are not dispatch or state from redux.
interface IUserSettings {
    modeStatus: (modeValue: string) => void;
}

type UserSettingsProps = IDispatchProps & IUserSettings & IMapStateToProps;

//Render:

const UserSettings = ({
    userData,
    userSettings,
    userGetProfilePicture,
    modeStatus,
    toggleSnackbarOpen,
}: UserSettingsProps): JSX.Element => {
    useEffect(() => {
        userGetProfilePicture();
    }, []);

    //Dark Mode Toggler:
    const [theme, toggleTheme] = useDarkMode();

    enum RenderView {
        RENDER_USER_PROFILE = 'RENDER_USER_PROFILE',
        RENDER_PASSWORD = 'RENDER_PASSWORD',
    }

    //Settings view state handler:
    const [stateView, setStateView] = useState(RenderView.RENDER_USER_PROFILE);

    const renderSettingsView = (view: RenderView) => {
        if (view) {
            switch (view) {
                case RenderView.RENDER_USER_PROFILE:
                    return (
                        <ProfileDetails
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            userName={userData.userName}
                            email={userData.email}
                            snackbar={toggleSnackbarOpen}
                        />
                    );
                case RenderView.RENDER_PASSWORD:
                    return <PasswordDetails />;

                default:
                    return <></>;
            }
        }
    };

    const changeRenderView = (view: RenderView) => {
        if (view !== stateView) {
            setStateView(view);
        }
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

    return (
        <>
            <Snackbar timeout={3000} />
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
                        <LinkButton
                            onClick={() =>
                                changeRenderView(RenderView.RENDER_USER_PROFILE)
                            }
                        >
                            User Profile
                        </LinkButton>
                        <LinkButton
                            onClick={() =>
                                changeRenderView(RenderView.RENDER_PASSWORD)
                            }
                        >
                            Password
                        </LinkButton>
                        <LinkButton>Security & Privacy</LinkButton>
                        <LinkButton>Upgrade</LinkButton>
                    </LinkContainer>
                    <FormContainer>
                        {renderSettingsView(stateView)}
                    </FormContainer>
                </ContentWrapper>
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
    toggleSnackbarOpen,
})(UserSettings);
