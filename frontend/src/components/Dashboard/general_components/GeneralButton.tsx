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
    padding: 0.8rem 1rem;
    border-radius: 0.4rem;
    font-family: 'Lato', sans-serif;
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => props.buttonTextColor};
    box-shadow: ${(props) =>
        props.disableShadow === true
            ? 'none'
            : 'rgba(0, 0, 0, 0.4) 0px 2px 4px,rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,rgba(0, 0, 0, 0.2) 0px -3px 0px inset;'};
    overflow: hidden;
    width: 100%;

    transition: all 0.1s ease-in;

    &:focus {
        outline: none;
    }

    &:hover {
        box-shadow: ${(props) => props.hoverShadow}
        background-color: ${(props) => props.hoverColor};
        transform: ${(props) => props.hoverTransform};
    }
`;

const IconContainer = styled.div<IGeneralButtonProps>`
    margin-right: ${(props) => props.iconMargin};
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
    disableShadow?: boolean;
    iconMargin?: string;
    fontSize?: string;
    hoverColor?: string;
    fontWeight?: string;
    hoverTransform?: string;
    hoverShadow?: string;
}

const GeneralButton = ({
    buttonLabel = 'Button',
    name = 'Button',
    buttonBackground = '#4263EB',
    buttonTextColor = 'white',
    onClick,
    isDisabledOnLoading = false,
    buttonIcon,
    disableShadow = false,
    iconMargin = '0.25rem',
    fontSize = '1em',
    hoverColor = 'none',
    fontWeight = '600',
    hoverTransform = 'scale(1.05)',
    hoverShadow,
}: IGeneralButtonProps): JSX.Element => {
    return (
        <>
            <StyledGeneralButton
                onClick={onClick}
                name={name}
                buttonBackground={buttonBackground}
                buttonTextColor={buttonTextColor}
                disabled={isDisabledOnLoading}
                disableShadow={disableShadow}
                fontSize={fontSize}
                hoverColor={hoverColor}
                fontWeight={fontWeight}
                hoverTransform={hoverTransform}
                hoverShadow={hoverShadow}
            >
                <IconContainer iconMargin={iconMargin}>
                    {buttonIcon && buttonIcon}
                </IconContainer>
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
