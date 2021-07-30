import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJWT } from '../../utils/jwthelper';
import { logoutHelper } from '../../utils/logouthelper';
import { deviceMin } from '../../devices/breakpoints';

//Styled-icons:

import styled from 'styled-components';

import petriLogoEdit2 from '../../Img/petriLogoEdit2.png';

import Button from '@material-ui/core/Button';
import { Home } from '@styled-icons/material-rounded/Home';
import { VideoCamera } from '@styled-icons/entypo/VideoCamera';
import { Message } from '@styled-icons/material-rounded/Message';
import { CalendarToday } from '@styled-icons/material-rounded/CalendarToday';
import { Folder } from '@styled-icons/material-rounded/Folder';
import { BarChart } from '@styled-icons/material-rounded/BarChart';
import { LogOut } from '@styled-icons/ionicons-sharp/LogOut';
import { Settings } from '@styled-icons/material-rounded/Settings';

//Styling:

const DefaultNavbar = styled.div`
    /* box-sizing: border-box; */
    display: flex;
    justify-content: space-between;
    background-color: #141628;
    align-items: center;
    margin: 0;
    position: sticky;
    top: 0;
    z-index: 99999 !important;
`;
const NavLinks = styled.div`
    display: flex;
`;

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
        transition: width 0.5s ease, background-color 0.5s ease;
    }

    &:hover::after {
        width: 100%;
        background: #ee6c4d;
    }

    &:hover {
        color: white !important;
    }

    @media only screen and (min-width: 300px) {
        font-size: 10px;
        margin-left: 15px;
        margin-right: 15px;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (min-width: 350px) {
        font-size: 10px;
        margin-left: 15px;
        margin-right: 15px;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (min-width: 480px) {
        font-size: 15px;
        margin-left: 25px;
        margin-right: 25px;
        white-space: nowrap;
        overflow: hidden;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 12px;
        margin-left: 25px;
        margin-right: 25px;
        white-space: nowrap;
        overflow: hidden;
    }
`;

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
`;

const DashboardNavbar = styled.div`
    height: 100%;
    width: 10rem;
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.navBgColor};
    overflow-x: hidden;
    padding-top: 10px;
    text-align: left;
    transition: all 0.5s linear;
    border-right: ${(props) => props.theme.navBorderColor};

    @media ${deviceMin.laptopSs} {
        width: 100px;
    }

    @media ${deviceMin.tablet} {
        width: 10rem;
    }
`;

const DashboardLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    text-decoration: none !important;
`;
const StyledImg = styled.img`
    /* max-width: 500px; */
    max-width: 30%;
    /* max-height: 85px; */
    max-height: 30%;
    object-fit: cover;

    @media only screen and (min-width: 300px) {
        max-width: 20%;
        max-height: 20%;
        object-fit: cover;
    }

    @media only screen and (min-width: 360px) {
        max-width: 20%;
        max-height: 20%;
        object-fit: cover;
    }

    @media only screen and (min-width: 480px) {
        max-width: 23%;
        max-height: 23%;
        object-fit: cover;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        max-width: 15%;
        max-height: 15%;
        object-fit: cover;
    }
`;
const StyledLogoHeader = styled.h1`
    margin: 0;
    font-weight: 100;
    font-size: 50px;
    font-family: 'Pattaya', serif;

    @media only screen and (min-width: 300px) and (orientation: portrait) {
        font-size: 23px;
    }

    @media only screen and (min-width: 360px) and (orientation: portrait) {
        font-size: 28px;
    }

    @media only screen and (min-width: 480px) and (orientation: portrait) {
        font-size: 28px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 30px;
    }
`;
const StyledLogoMiniContainer = styled.div`
    margin: -10px;

    @media only screen and (max-width: 325px) and (orientation: portrait) {
        padding-bottom: 12px;
    }
`;
const StyledMiniLogo = styled.p`
    margin: 0;
    font-size: 16px;
    font-family: 'Pattaya', serif;

    @media only screen and (min-width: 300px) and (orientation: portrait) {
        font-size: 9px;
        margin-left: 10px;
        padding: 4px 0;
    }

    @media only screen and (min-width: 360px) and (orientation: portrait) {
        font-size: 10px;
        margin-left: 5px;
    }

    @media only screen and (min-width: 480px) and (orientation: portrait) {
        font-size: 12px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 10px;
        margin-left: 5px;
    }
`;
const StyledHomeHeart = styled(Home)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledVideoCamera = styled(VideoCamera)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledChatIcon = styled(Message)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledCalendar = styled(CalendarToday)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledFolder = styled(Folder)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledTools = styled(BarChart)`
    height: 2rem;
    width: 2rem;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;
const StyledLogOut = styled(LogOut)`
    margin-bottom: 3px;
    height: 30px;
    width: 32px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledDashboardLogo = styled.img`
    margin-bottom: 10px;
    height: 65px;
    width: 65px;
    color: ${(props) => props.theme.navIconHoverColor};
    object-fit: cover;

    @media ${deviceMin.laptopSs} {
        height: 48px;
        width: 48px;
    }

    @media ${deviceMin.tablet} {
        height: 65px;
        width: 65px;
    }
`;

const StyledLinkLabel = styled.label`
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 900;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;

    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }

    @media ${deviceMin.laptopSs} {
        display: none;
    }

    @media ${deviceMin.tablet} {
        display: block;
    }
`;

const StyledCogs = styled(Settings)`
    margin-bottom: 3px;
    height: 37px;
    width: 37px;
    color: ${(props) => props.theme.navIconColor};
    cursor: pointer;
    ${DashboardLink}:hover & {
        color: ${(props) => props.theme.navIconHoverColor};
    }
`;

const StyledDivider = styled.hr`
    background-color: ${(props) => props.theme.LogoDividerColor};
    margin: 0;
`;

//Component Structure:

const Navbar = ({ StateJwt }) => {
    /*
        The navbar will render either the landing page sticky top navbar, or the dashboard side navbar based on if the user has a JWT. This is a very simple authentication method dependent on the JWT sent over from the server-side if the user has entered their login credentials correctly.
    */

    const [JWT, setJWT] = useState(undefined);

    const location = useLocation();

    useEffect(() => {
        const jwt2 = getJWT();
        setJWT(jwt2);
    }, [location]);

    const renderNavOnJWT = (jwt) => {
        if (
            jwt &&
            Object.keys(jwt).length !== 0 &&
            jwt.constructor !== Object
        ) {
            //If the user has a JWT, render the dashboard navbar.
            return (
                <DashboardNavbar>
                    <StyledDashboardLogo src={petriLogoEdit2} />
                    <StyledDivider />
                    <DashboardLink to="/dashboard">
                        <StyledHomeHeart />
                        <StyledLinkLabel>Dashboard</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to="/messenger">
                        <StyledChatIcon />
                        <StyledLinkLabel>Messenger</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to="/calendar">
                        <StyledCalendar />
                        <StyledLinkLabel>Calendar</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to="/notebook/root">
                        <StyledFolder />
                        <StyledLinkLabel>Notebook</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to="/scitools">
                        <StyledTools />
                        <StyledLinkLabel>Sci-Tools</StyledLinkLabel>
                    </DashboardLink>
                    <DashboardLink to="/settings">
                        <StyledCogs />
                        <StyledLinkLabel>Settings</StyledLinkLabel>
                    </DashboardLink>
                    {/* <DashboardLink to="/logout">
                        <StyledLogOut />
                        <StyledLinkLabel>LOGOUT</StyledLinkLabel>
                    </DashboardLink> */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={logoutHelper}
                    >
                        Logout
                    </Button>
                </DashboardNavbar>
            );
        } else {
            //Original landing page navbar:
            return (
                <DefaultNavbar>
                    <LogoLink to="/">
                        <StyledImg src={petriLogoEdit2}></StyledImg>
                        <StyledLogoHeader>
                            Petri
                            <StyledLogoMiniContainer>
                                <StyledMiniLogo>
                                    Research workflow upgraded
                                </StyledMiniLogo>
                            </StyledLogoMiniContainer>
                        </StyledLogoHeader>
                    </LogoLink>
                    <NavLinks>
                        <DefaultLink to="/signup">Sign up</DefaultLink>
                        <DefaultLink to="/login">Log In</DefaultLink>
                    </NavLinks>
                </DefaultNavbar>
            );
        }
    };

    return <>{renderNavOnJWT(JWT)}</>;
};

const mapStateToProps = (state) => {
    if (!state.auth.userLogIn) {
        return {
            StateJwt: state.auth.userLogIn,
        };
    } else {
        return {
            StateJwt: state.auth.userLogIn.token,
        };
    }
};

export default connect(mapStateToProps)(Navbar);
