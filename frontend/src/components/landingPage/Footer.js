import React from 'react';
import styled from 'styled-components';


//Styles:

import { GithubSquare } from '@styled-icons/fa-brands/GithubSquare';

const FooterDiv = styled.div`
    display: flex;
    background: radial-gradient(circle, rgba(54,11,66,1) 9%, rgba(42,5,51,1) 38%, rgba(41,5,50,1) 69%, rgba(27,0,31,1) 100%);
    text-align: center;
    margin: 0;
    border-top: 1px solid white;
    padding: 40px 40px;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    @media only screen and (max-width: 650px) {
        padding: 10px 10px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        padding: 10px 10px;
    }
    

`
const FooterHeader = styled.h2`
    margin: 0;
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 17px;
    font-weight: 100;

    @media only screen and (max-width: 650px) {
        font-size: 8px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 8px;
    }
`
const StyledAnchor = styled.a`
    text-decoration: none;
    color: white;
    transition: all .5s ease-in;

    &:hover {
        text-decoration: none;
        color: white;
        transform: scale(1.1);
    }
`

const GithubIcon = styled(GithubSquare)`
    height: 50px;
    width: 50px;

    @media only screen and (max-width: 650px) {
        height: 20px;
        width: 20px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        height: 20px;
        width: 20px;
    }
`


//Render:

/*
    So far, a very simple footer component consisting of an email and a github link. Will add more social media connections when created.
*/

const Footer = () => {
    return (
        <FooterDiv>
            <FooterHeader>Made by Harry Zhou <span>&copy;</span> 2020.</FooterHeader>
            <FooterHeader>haz.dev.git@gmail.com (For Business Purposes Only)</FooterHeader>
            <FooterHeader>
                <StyledAnchor target='_blank' href='https://github.com/Haz-git'>
                    <GithubIcon />
                </StyledAnchor>
            </FooterHeader>
        </FooterDiv>
    )
}

export default Footer;