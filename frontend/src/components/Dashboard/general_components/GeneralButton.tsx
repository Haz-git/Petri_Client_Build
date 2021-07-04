import React from 'react';
import styled from 'styled-components';

//Styles:
const StyledGeneralButton = styled.button<IGeneralButtonProps>`
    border: none;
    background: ${(props) => props.buttonBackground};
    padding: 0.7rem 1rem;
    border-radius: 0.3rem;
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.buttonTextColor};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    overflow: hidden;

    transition: all 0.1s ease-in;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.05);
    }
`;

//Interface:

interface IGeneralButtonProps {
    buttonLabel?: string;
    name?: string;
    onClick?: React.ChangeEventHandler<HTMLInputElement>;
    buttonBackground?: string;
    buttonTextColor?: string;
}

const GeneralButton = ({
    buttonLabel = 'Button',
    name = 'Button',
    buttonBackground = '#222444',
    buttonTextColor = 'white',
    onClick,
}: IGeneralButtonProps): JSX.Element => {
    return (
        <>
            <StyledGeneralButton
                onClick={onClick}
                name={name}
                buttonBackground={buttonBackground}
                buttonTextColor={buttonTextColor}
            >
                {buttonLabel}
            </StyledGeneralButton>
        </>
    );
};

export default GeneralButton;
