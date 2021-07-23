import React from 'react';

//Styles:
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const jumpingDots = keyframes`
    20% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-.8em);
    }
`;

const Dot = styled.span`
    width: 0.9em;
    height: 0.9em;
    margin: 0 0.2em;
    border-radius: 50%;
    display: inline-block;
    animation-name: ${jumpingDots};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background: #3c4042;

    :nth-child(2) {
        animation-delay: 0.2s;
    }

    :nth-child(3) {
        animation-delay: 0.4s;
    }
`;

const LoadingDots = () => {
    return (
        <>
            <Dot />
            <Dot />
            <Dot />
        </>
    );
};

export default LoadingDots;
