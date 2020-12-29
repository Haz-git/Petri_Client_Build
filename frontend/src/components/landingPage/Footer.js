import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

    @media only screen and (min-width: 300px) {
        zoom: 0.3;
        -moz-transform: scale(0.3);
    }

    @media only screen and (min-width: 350px) {
        zoom: 0.35;
        -moz-transform: scale(0.35);
    }

    @media only screen and (min-width: 480px) {
        zoom: 0.45;
        -moz-transform: scale(0.45);
    }

    @media only screen and (min-width: 600px) {
        zoom: 0.5;
        -moz-transform: scale(0.5);
    }

    @media only screen and (min-width: 770px) {
        zoom: 0.55;
        -moz-transform: scale(0.55);
    }

    @media only screen and (min-width: 900px) {
        zoom: 0.55;
        -moz-transform: scale(0.55);
    }

    @media only screen and (min-width: 1100px) {
        zoom: 0.65;
        -moz-transform: scale(0.65);
    }

    @media only screen and (min-width: 1350px) {
        zoom: 1;
        -moz-transform: scale(1);
    }

`
const FooterHeader = styled.h2`
    margin: 0;
    font-family: 'Nunito', sans-serif;
    color: white;
    font-size: 17px;
    font-weight: 100;
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