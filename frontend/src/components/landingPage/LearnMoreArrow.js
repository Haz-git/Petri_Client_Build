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
`
const StyledArrowDown = styled(ArrowDown)`
    height: 25px;
    width: 25px;
    color: white;
    margin-right: 15px;
`




//Render:

const LearnMoreArrow = () => {

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