import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//Styles:

import { ArrowDown } from '@styled-icons/bootstrap/ArrowDown';

const ArrowContainer = styled.div`
    display: flex;
    transition: opacity .8s ease;

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

const FadeOutText = styled.h2`
    color: white;
    font-family: 'Open Sans', 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 700;
`
const StyledArrowDown = styled(ArrowDown)`
    height: 25px;
    width: 25px;
    color: white;
    margin-right: 15px;
`




//Render:

const LearnMoreArrow = () => {

    /*
        This learn more arrow should be at opacity: 1 on initial render of the component, when the user has initially entered the landing page. When the 'currentScrollPos', or pageYOffset becomes greater than 0--or when the user starts to scroll down, then the opacity is '0' (starts to fade away).
    */

    const [ opacity, setOpacity ] = useState('1');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;
                let maxScroll = document.body.scrollHeight - window.innerHeight;
                // console.log(maxScroll);
                // // && currentScrollPos < maxScroll
                
                if (currentScrollPos > 0) {
                    setOpacity('0');
                } else {
                    setOpacity('1');
                }
            }
        }
    })

    return (
        <ArrowContainer
            style={{ opacity: `${opacity}` }}
        >
            <StyledArrowDown />
            <FadeOutText>Learn More</FadeOutText>
        </ArrowContainer>
    )
}

export default LearnMoreArrow;