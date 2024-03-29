import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { userGetProfilePicture } from '../../../redux/userSettings/UserSettingActions';
import { toggleSnackbarOpen } from '../../../redux/snackBar/snackBarActions';

//Components:
import PageHeader from '../general_components/PageHeader';
import ProfilePictureModal from './settings_components/ProfilePictureModal';

//Wizard form views:
import ProfileDetails from './settings_components/ProfileDetails';
import PasswordDetails from './settings_components/PasswordDetails';

//Dark Mode Option:
import { useDarkMode } from '../../Styling/useDarkMode';
import Toggler from '../../../components/Styling/Toggler';

//Styles:
import defaultAvatar from '../../../Img/default_avatar.png';
import { Menu } from '@styled-icons/entypo/Menu';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { deviceMin } from '../../../devices/breakpoints';

const StyledClose = styled(CloseOutline)`
    height: 2.5rem;
    width: 2.5rem;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    margin: 0;
`;

const StyledMenu = styled(Menu)`
    height: 2.5rem;
    width: 2.5rem;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    margin: 0;
`;

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

    @media ${deviceMin.laptopSs} {
        display: block;
    }

    @media ${deviceMin.tablet} {
        display: grid;
    }
`;

const LinkContainer = styled.div`
    border-right: 3px solid #f8f8ff;
    display: flex;
    flex-direction: column;

    @media ${deviceMin.laptopSs} {
        display: none;
    }

    @media ${deviceMin.tablet} {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
    }
`;

const LinkButton = styled.button<LinkButtonProps>`
    border-bottom: ${(props) =>
        props.state === true ? '3px solid @222444' : '3px solid #f8f8ff'};
    text-align: center;
    padding: 1.5rem 0;
    background-color: ${(props) =>
        props.state === true ? '#222444' : 'white'};
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => (props.state === true ? 'white' : props.theme.text)};
    opacity: ${(props) => (props.state === true ? '1' : '0.7')};
    box-shadow: ${(props) =>
        props.state === true
            ? ' rgb(38, 57, 77) 0px 20px 30px -10px;'
            : 'none'};

    &:focus {
        outline: 0;
    }
`;

const FormContainer = styled.div`
    padding: 2rem 4rem;
    height: fit-content;
    animation: all 0.5s ease-in-out;

    @media ${deviceMin.laptopSs} {
        padding: 1rem 2rem;
    }

    @media ${deviceMin.tablet} {
        padding: 2rem 4rem;
    }
`;

const ProfileImageContainer = styled.div`
    text-align: center;
    border-bottom: 3px solid #f8f8ff;

    @media ${deviceMin.laptopSs} {
        display: none;
    }

    @media ${deviceMin.tablet} {
        display: block;
        padding: 0;
    }
`;

const StyledCustomAvatar = styled.img`
    margin-top: 1rem;
    height: 12.5rem;
    width: 12.5rem;
    /* padding: 1rem 1rem; */
    border-radius: 50%;
    vertical-align: middle;
    border: 3px solid ${(props) => props.theme.settingsAvatarBorderC};
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;

    @media ${deviceMin.laptopSs} {
        height: 5rem;
        width: 5rem;
    }

    @media ${deviceMin.tablet} {
        height: 8.5rem;
        width: 8.5rem;
    }

    @media ${deviceMin.laptopS} {
        height: 12.5rem;
        width: 12.5rem;
    }
`;

const StyledDefaultAvatar = styled.img`
    margin-top: 1rem;
    height: 12.5rem;
    width: 12.5rem;
    /* padding: 1rem 1rem; */
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 3px solid ${(props) => props.theme.settingsAvatarBorderC};
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;

    @media ${deviceMin.laptopSs} {
        height: 5rem;
        width: 5rem;
    }

    @media ${deviceMin.tablet} {
        height: 8.5rem;
        width: 8.5rem;
    }

    @media ${deviceMin.laptopS} {
        height: 12.5rem;
        width: 12.5rem;
    }
`;

const AvatarName = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 900;
    color: ${(props) => props.theme.text};
    opacity: 1;

    @media ${deviceMin.laptopSs} {
        font-size: 1em;
    }

    @media ${deviceMin.tablet} {
        font-size: 1.2em;
    }
`;

const AvatarSpacer = styled.div`
    margin: 1rem 0;
`;

//Styles for Burger menu on smaller screens:
const BurgerContainer = styled.div`
    display: block;
    padding: 1rem 0 0 1.7rem;

    @media ${deviceMin.laptopSs} {
    }

    @media ${deviceMin.tablet} {
        display: none;
    }
`;

const BurgerButton = styled.button`
    margin: 0;
    padding: 0;
    background: none;
    outline: none;

    &:focus {
        outline: none;
    }
`;

const BurgerLinkButton = styled.button`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    padding: 0.5rem 0.5rem;
    text-align: left;
    color: ${(props) => props.theme.text};
    border: 1px solid #f8f8ff;
    border-radius: 0.3rem;
    background: rgba(0, 0, 34, 0.1);

    outline: none;

    &:focus {
        outline: none;
    }
`;

const BurgerLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    max-width: 14.25rem;

    @media ${deviceMin.tablet} {
        display: none;
    }
`;

interface LinkButtonProps {
    stateOnClick: boolean;
}

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

    //Burger Menu toggler:
    const [burgerState, setBurgerState] = useState(false);

    //EditProfilePicture Modal states:
    const [profileModalState, setProfileModalState] = useState(false);

    //Button Link States:
    const [profileViewBtn, setProfileViewBtn] = useState(true);
    const [passwordViewBtn, setPasswordViewBtn] = useState(false);

    //View Constants

    enum RenderView {
        RENDER_USER_PROFILE = 'RENDER_USER_PROFILE',
        RENDER_PASSWORD = 'RENDER_PASSWORD',
    }

    //Settings view state handler:
    const [stateView, setStateView] = useState(RenderView.RENDER_USER_PROFILE);

    //Burger Menu state handlers:
    const openBurgerMenu = () => {
        setBurgerState(!burgerState);
    };

    //EditProfilePicture Modal state handlers:
    const openProfilePicModal = () => {
        setProfileModalState(true);
    };

    const closeProfilePicModal = () => {
        setProfileModalState(false);
    };

    //Button Link State handler -- align with view:
    const alignLinkButtonWithView = (view: RenderView) => {
        switch (view) {
            case RenderView.RENDER_USER_PROFILE:
                setPasswordViewBtn(false);
                setProfileViewBtn(true);
                break;
            case RenderView.RENDER_PASSWORD:
                setPasswordViewBtn(true);
                setProfileViewBtn(false);
                break;
            default:
                setProfileViewBtn(true);
                setPasswordViewBtn(false);
        }
    };

    const renderSettingsView = (view: RenderView) => {
        if (view) {
            switch (view) {
                case RenderView.RENDER_USER_PROFILE:
                    if (profileViewBtn !== true)
                        alignLinkButtonWithView(RenderView.RENDER_USER_PROFILE);
                    return (
                        <ProfileDetails
                            firstName={userData.firstName}
                            lastName={userData.lastName}
                            userName={userData.userName}
                            email={userData.email}
                            snackbar={toggleSnackbarOpen}
                            openProfilePicModal={openProfilePicModal}
                        />
                    );
                case RenderView.RENDER_PASSWORD:
                    if (passwordViewBtn !== true)
                        alignLinkButtonWithView(RenderView.RENDER_PASSWORD);
                    return <PasswordDetails snackbar={toggleSnackbarOpen} />;

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
            <PageHeaderContainer>
                <PageHeader
                    headerTitle="Settings"
                    headerDesc="Change your profile and account settings"
                />
            </PageHeaderContainer>
            <MainContainer>
                <ContentWrapper>
                    <BurgerContainer>
                        <BurgerButton onClick={openBurgerMenu}>
                            {burgerState === false ? (
                                <StyledMenu />
                            ) : (
                                <StyledClose />
                            )}
                        </BurgerButton>
                    </BurgerContainer>
                    {burgerState && (
                        <BurgerLinkContainer>
                            <BurgerLinkButton
                                onClick={() =>
                                    changeRenderView(
                                        RenderView.RENDER_USER_PROFILE
                                    )
                                }
                            >
                                Personal Details
                            </BurgerLinkButton>
                            <BurgerLinkButton
                                onClick={() =>
                                    changeRenderView(RenderView.RENDER_PASSWORD)
                                }
                            >
                                Password
                            </BurgerLinkButton>
                            <BurgerLinkButton>
                                Security & Privacy
                            </BurgerLinkButton>
                            <BurgerLinkButton>Upgrade</BurgerLinkButton>
                        </BurgerLinkContainer>
                    )}
                    <LinkContainer>
                        <ProfileImageContainer>
                            {/* <Link
                            to={`settings/editProfilePicture/${userData._id}`}
                        > */}
                            {renderUserImage()}
                            {/* </Link> */}
                            <AvatarSpacer />
                            <AvatarName>
                                {userData.firstName + ' ' + userData.lastName}
                            </AvatarName>
                        </ProfileImageContainer>
                        <LinkButton
                            onClick={() =>
                                changeRenderView(RenderView.RENDER_USER_PROFILE)
                            }
                            state={profileViewBtn}
                        >
                            User Profile
                        </LinkButton>
                        <LinkButton
                            onClick={() =>
                                changeRenderView(RenderView.RENDER_PASSWORD)
                            }
                            state={passwordViewBtn}
                        >
                            Password
                        </LinkButton>
                        <LinkButton>Security & Privacy</LinkButton>
                        <LinkButton>Upgrade</LinkButton>
                        <Toggler
                            theme={theme}
                            toggleTheme={toggleTheme}
                            callBack={modeStatus}
                        />
                    </LinkContainer>
                    <FormContainer>
                        {renderSettingsView(stateView)}
                    </FormContainer>
                </ContentWrapper>
            </MainContainer>
            <ProfilePictureModal
                openState={profileModalState}
                closeFunc={closeProfilePicModal}
            />
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
