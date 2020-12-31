import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//Styles:

import { ArrowDown } from '@styled-icons/bootstrap/ArrowDown';

const ArrowContainer = styled.div`
    display: flex;
    transition: opacity .8s ease;

`

const FadeOutText = styled.h2`
    color: white;
    font-family: 'Open Sans', 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 700;

    @media only screen and (max-width: 650px)  {
        font-size: 12px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 14px;
    }

    
`
const StyledArrowDown = styled(ArrowDown)`
    height: 25px;
    width: 25px;
    color: white;
    margin-right: 15px;

    @media only screen and (max-width: 650px)  {
        height: 15px;
        width: 15px;
        margin-right: 5px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        height: 15px;
        width: 15px;
        margin-right: 5px;
    }
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