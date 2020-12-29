import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJWT } from '../../utils/jwthelper';

//Styled-icons:

import styled from 'styled-components';

import petriLogoEdit2 from '../../Img/petriLogoEdit2.png';

import { HomeHeart } from '@styled-icons/boxicons-solid/HomeHeart';
import { VideoCamera } from '@styled-icons/entypo/VideoCamera';
import { ChatLeftDotsFill } from '@styled-icons/bootstrap/ChatLeftDotsFill';
import { Calendar } from '@styled-icons/foundation/Calendar';
import { Folder } from '@styled-icons/entypo/Folder';
import { Tools } from '@styled-icons/entypo/Tools';
import { LogOut } from '@styled-icons/ionicons-sharp/LogOut';
import { SettingsApplications } from '@styled-icons/material/SettingsApplications';


//Styling:

const DefaultNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #141628;
    align-items: center;
    margin: 0;
    position: sticky;
    top: 0;
    z-index: 99999 !important;

`
const NavLinks = styled.div`
    display: flex;
`

const DefaultLink = styled(Link)`
    text-decoration: none !important;
    margin-left: 40px;
    margin-right: 40px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-weight: 300;
    &::after {
        display: block;
        content: '';
        height: 3px;
        width: 0;
        background: transparent;
        transition: width .5s ease, background-color .5s ease;
    }

    &:hover::after {
        width: 100%;
        background: #ee6c4d;
    }

    &:hover {
        color: white !important;
    }
`

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none !important;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    font-family: 'Nunito', sans-serif;
    font-weight: 300;
    &:hover {
        color: white !important;
    }
`

const DashboardNavbar = styled.div`
    height: 100%; 
    width: fit-content; 
    position: fixed; 
    z-index: 99999; 
    top: 0; 
    left: 0;
    background-color:${(props) => props.theme.navBgColor}; 
    overflow-x: hidden; 
    padding-top: 10px;
    text-align: center;
    transition: all 0.5s linear;
    border-right: ${(props) => props.theme.navBorderColor};

`

const DashboardLink = styled(Link)`
    padding: 10px 10px;
    text-decoration: none !important;
    font-size: 25px;
    display: block;
`
const StyledImg = styled.img`
    max-width: 500px;
    max-height: 85px;
    object-fit: cover;
`
const StyledLogoHeader = styled.h1`
    margin: 0;
    font-weight: 100;
    font-size: 50px;
    font-family: 'Pattaya', serif;
`
const StyledLogoMiniContainer = styled.div`
    margin: -10px;
`
const StyledMiniLogo = styled.p`
    margin: 0;
    font-size: 16px;
    font-family: 'Pattaya', serif;
`
const StyledHomeHeart = styled(HomeHeart)`
    margin-bottom: 3px;
    height: 31px;
    width: 31px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledVideoCamera = styled(VideoCamera)`
    margin-bottom: 3px;
    height: 30px;
    width: 27px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledChatIcon = styled(ChatLeftDotsFill)`
    margin-bottom: 3px;
    height: 30px;
    width: 27px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledCalendar = styled(Calendar)`
    margin-bottom: 3px;
    height: 35px;
    width: 35px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledFolder = styled(Folder)`
    margin-bottom: 3px;
    height: 30px;
    width: 30px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledTools = styled(Tools)`
    margin-bottom: 3px;
    height: 30px;
    width: 30px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`
const StyledLogOut = styled(LogOut)`
    margin-bottom: 3px;
    height: 30px;
    width: 32px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledDashboardLogo = styled.img`
    margin-bottom: 10px;
    height: 65px;
    width: 65px;
    color: ${(props) => props.theme.navIconHoverColor};
    object-fit: cover;
`

const StyledLinkLabel = styled.label`
    display: block;
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    margin-top: 0px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;

    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledCogs = styled(SettingsApplications)`
    margin-bottom: 3px;
    height: 37px;
    width: 37px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`

const StyledDivider = styled.hr`
    background-color: ${(props) => props.theme.LogoDividerColor};
    margin: 0;
`



//Component Structure:

const Navbar = ({ StateJwt }) => {

    /*
        The navbar will render either the landing page sticky top navbar, or the dashboard side navbar based on if the user has a JWT. This is a very simple authentication method dependent on the JWT sent over from the server-side if the user has entered their login credentials correctly.
    */

    const [JWT, setJWT] = useState(undefined);

    useEffect(() => {
        const jwt2 = getJWT();
        setJWT(jwt2);
    }, [StateJwt]);



    const renderNavOnJWT = jwt => {

        if (jwt) {
            //If the user has a JWT, render the dashboard navbar.
            return (
                <DashboardNavbar>
                    <StyledDashboardLogo src={petriLogoEdit2} />
                    <StyledDivider />
                    <DashboardLink to='/dashboard'>
                        <StyledHomeHeart />
                        <StyledLinkLabel>DASHBOARD</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/messenger'>
                        <StyledChatIcon />
                        <StyledLinkLabel>MESSENGER</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/calendar'>
                        <StyledCalendar />
                        <StyledLinkLabel>CALENDAR</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/createbionote'>
                        <StyledFolder />
                        <StyledLinkLabel>BIONOTES</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/scitools'>
                        <StyledTools />
                        <StyledLinkLabel>SCI-TOOLS</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/settings'>
                        <StyledCogs />
                        <StyledLinkLabel>SETTINGS</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to='/logout'>
                        <StyledLogOut />
                        <StyledLinkLabel>LOGOUT</StyledLinkLabel>
                    </DashboardLink>
                </DashboardNavbar>
            )
        } else {
            //Original landing page navbar:
            return (
                <DefaultNavbar>
                    <LogoLink to='/'>
                        <StyledImg src={petriLogoEdit2}>
                        </StyledImg>
                            <StyledLogoHeader>
                                Petri
                                <StyledLogoMiniContainer>
                                    <StyledMiniLogo>Research workflow upgraded</StyledMiniLogo>
                                </StyledLogoMiniContainer>
                            </StyledLogoHeader>
                    </LogoLink>
                    <NavLinks>
                        <DefaultLink to='/signup'>Sign up</DefaultLink>
                        <DefaultLink to='/login' >Log In</DefaultLink>
                    </NavLinks>
                </DefaultNavbar>
            )
        }
    }


    return (
        <>
            {renderNavOnJWT(JWT)}
        </>
    )
}

const mapStateToProps = state => {
    if (!state.auth.userLogIn) {
        return {
            StateJwt: state.auth.userLogIn,
        }
    } else {
        return {
            StateJwt: state.auth.userLogIn.token,
        }
    }
}

export default connect(mapStateToProps)(Navbar);
