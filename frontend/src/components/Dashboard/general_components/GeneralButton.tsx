import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

//Styles:
const StyledGeneralButton = styled.button<IGeneralButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
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

const LoaderContainer = styled.div`
    margin-left: 0.5rem;
`;

//Interface:

interface IGeneralButtonProps {
    buttonLabel?: string;
    name?: string;
    onClick?: React.ChangeEventHandler<HTMLInputElement>;
    buttonBackground?: string;
    buttonTextColor?: string;
    isDisabledOnLoading?: boolean;
    buttonIcon?: JSX.Element;
}

const GeneralButton = ({
    buttonLabel = 'Button',
    name = 'Button',
    buttonBackground = '#222444',
    buttonTextColor = 'white',
    onClick,
    isDisabledOnLoading = false,
    buttonIcon,
}: IGeneralButtonProps): JSX.Element => {
    return (
        <>
            <StyledGeneralButton
                onClick={onClick}
                name={name}
                buttonBackground={buttonBackground}
                buttonTextColor={buttonTextColor}
                disabled={isDisabledOnLoading}
            >
                {buttonLabel}
                {isDisabledOnLoading === true ? (
                    <LoaderContainer>
                        <CircularProgress
                            size={17}
                            thickness={6}
                            color="inherit"
                        />
                    </LoaderContainer>
                ) : null}
            </StyledGeneralButton>
        </>
    );
};

export default GeneralButton;
