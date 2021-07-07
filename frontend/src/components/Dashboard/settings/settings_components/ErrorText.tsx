import React from 'react';
import styled, { keyframes } from 'styled-components';

//Styles:
const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const MainWrapper = styled.div`
    animation: ${fadeIn} 1s ease-in;
`;

const Text = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: red;
    margin: 0;
    padding: 0;
`;

const PlaceholderText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    margin: 0;
    padding: 0;
    opacity: 0;
`;

//Interface:

interface ErrorTextProps {
    desc: string;
    isShown: boolean;
}

const ErrorText = ({ desc, isShown }: ErrorTextProps): JSX.Element => {
    return (
        <MainWrapper>
            {isShown === true ? (
                <Text>{desc}</Text>
            ) : (
                <PlaceholderText>.</PlaceholderText>
            )}
        </MainWrapper>
    );
};

export default ErrorText;
