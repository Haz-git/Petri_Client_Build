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

//Styles:
import Button from '@material-ui/core/Button';
import { Save } from '@styled-icons/entypo/Save';
import defaultAvatar from '../../../Img/default_avatar.png';
import Badge from '@material-ui/core/Badge';
import Fade from 'react-reveal/Fade';


const MainContainer = styled.div`
    margin: 30px 30px;
    height: fit-content;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    ;
`

const MainGridContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    align-items: center;
`

const MainSettingsHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
`

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: white;
`
const ProfileImageContainer = styled.div`
    text-align: center;
    margin-top: 20px;
`

const StyledCustomAvatar = styled.img`
    height: 220px;
    width: 220px;
    border-radius: 50%;
    vertical-align: middle;
    border: 5px solid white;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    ;
    transition: transform .2s;

    &:hover {
        transform: scale(1.1);
    }
`

const StyledDefaultAvatar = styled.img`
    height: 220px;
    width: 220px;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 5px solid white;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    ;
    transition: transform .2s;

    &:hover {
        transform: scale(1.1);
    }
    
`

const SaveIcon = styled(Save)`
    height: 23px;
    width: 23px;
`

const TextFieldContainer = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
`
const ButtonRevealContainer = styled.div`
    position: absolute;
    margin-left: 10px;
`


//Render:

const UserSettings = ({
    userData, 
    userSettings, 
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
}) => {

    useEffect(() => {
        userGetProfilePicture()
    }, [])

    const [ newFirstName, setNewFirstName ] = useState('');
    const [ newUserName, setNewUserName ] = useState('');
    const [ newLastName, setNewLastName ] = useState('');
    const [ newEmailAddress, setNewEmailAddress ] = useState('');


    const renderUserImage = () => {
        if (userSettings.userSettings !== undefined && userSettings.userSettings !== null) {
            return (
                <Badge badgeContent={'Edit'} overlap='circle' color='secondary'>
                    <StyledCustomAvatar src={userSettings.userSettings.profileImg.url} />
                </Badge>
            )
        } else {
            return (
                <Badge badgeContent={'Edit'} overlap='circle' color='secondary'>
                    <StyledDefaultAvatar src={defaultAvatar} />
                </Badge>
            )
        }
    }


    // const handleNewUserDetailsSave = () => {
    //     alert(`We're sorry, this feature has not yet been implemented. Please try again later.`)
    // }

    const handleFirstNameChange = e => {
        e.preventDefault();
        setNewFirstName(e.target.value);
    }

    const handleUserNameChange = e => {
        e.preventDefault();
        setNewUserName(e.target.value);
    }

    const handleLastNameChange = e => {
        e.preventDefault();
        setNewLastName(e.target.value);
    }

    const handleEmailChange = e => {
        e.preventDefault();
        setNewEmailAddress(e.target.value);
    }

    const submitFirstName = () => {
        userChangeFirstName(newFirstName);
    }

    const submitUserName = () => {
        userChangeUserName(newUserName);
    }

    const submitLastName = () => {
        userChangeLastName(newLastName);
    }

    const submitEmailAddress = () => {
        userChangeEmailAddress(newEmailAddress);
    }

    const renderSubmitButton = (buttonValue, callback) => {
        if (buttonValue.trim() !== '') {
            return (
                <Fade>
                    <ButtonRevealContainer>
                        <Button variant='contained' color='primary' onClick={callback}>
                            Save
                        </Button>
                    </ButtonRevealContainer>
                </Fade>
            )
        } else {
            return null;
        }
    }


    return (
        <> 
            <MainSettingsHeaderContainer>
                <StyledMainHeader>Your Settings</StyledMainHeader>
            </MainSettingsHeaderContainer>
            <MainContainer>
                <ProfileImageContainer>
                    <Link to={`settings/editProfilePicture/${userData._id}`}>
                        {renderUserImage()}
                    </Link>
                </ProfileImageContainer>
                <MainGridContainer>
                    <div>
                        <TextFieldContainer>
                            <TextField 
                                id='outlined-required' 
                                label='First Name' 
                                variant='outlined' 
                                placeholder={`${userData.firstName}`} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleFirstNameChange}
                            />
                            {renderSubmitButton(newFirstName, submitFirstName)}
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <TextField 
                                id='outlined-required' 
                                label='Username' 
                                variant='outlined' 
                                placeholder={`${userData.userName}`} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleUserNameChange}
                            />
                            {renderSubmitButton(newUserName, submitUserName)}
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <TextField
                                disabled
                                id='outlined-required' 
                                label='Role' 
                                variant='outlined' 
                                placeholder='Basic-User'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TextFieldContainer>
                    </div>
                    <div>
                        <TextFieldContainer>
                            <TextField 
                                id='outlined-required' 
                                label='Last Name' 
                                variant='outlined' 
                                placeholder={`${userData.lastName}`} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleLastNameChange}
                            />
                            {renderSubmitButton(newLastName, submitLastName)}
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <TextField
                                disabled
                                id='outlined-required' 
                                label='Title' 
                                variant='outlined' 
                                placeholder='Researcher'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </TextFieldContainer>
                        <TextFieldContainer>
                            <TextField 
                                id='outlined-required' 
                                label='Email Address' 
                                variant='outlined' 
                                placeholder={`${userData.email}`} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText='Warning! Editing this will change your log in credentials.'
                                onChange={handleEmailChange}
                            />
                            {renderSubmitButton(newEmailAddress, submitEmailAddress)}
                        </TextFieldContainer>
                    </div>
                </MainGridContainer>
            </MainContainer>
        </>
    )
}

/*
Notes:

Profile Picture and avatar should use implementation of both react-avatar-editor and react-dropzone.
https://www.npmjs.com/package/react-avatar-editor
https://react-dropzone.js.org/




*/

const mapStateToProps = state => {
    return {
        userData: state.userSettings.userSettings,
        userSettings: state.userSettings,
    }
}

export default connect(mapStateToProps, {
    userGetProfilePicture,
    userChangeEmailAddress,
    userChangeFirstName,
    userChangeLastName,
    userChangeUserName,
})(UserSettings);