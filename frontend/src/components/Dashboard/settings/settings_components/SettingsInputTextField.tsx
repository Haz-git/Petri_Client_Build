import React from 'react';
import styled from 'styled-components';

//Styles:

const MainContainer = styled.div``;

const InputLabel = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: ${(props) => props.theme.text};
    opacity: 0.7;
`;

const InputSpacer = styled.div`
    margin: 0.5em 0em;
`;

const InputTextField = styled.input<ISettingsInputTextField>`
    border: ${(props) => props.hasError};
    width: 100%;
    border-radius: 0.2em;
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.text};
    transition: all 0.2s ease-in-out;
`;

//Interface:
interface ISettingsInputTextField {
    name?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    hasError?: boolean;
    value?: string;
}

const SettingsInputTextField = ({
    name,
    label,
    onChange,
    disabled,
    placeholder,
    type,
    hasError = false,
    value,
}: ISettingsInputTextField): JSX.Element => {
    return (
        <MainContainer>
            <InputLabel>{label}</InputLabel>
            <InputSpacer />
            <InputTextField
                hasError={
                    hasError === false ? '2px solid #e8e8e8' : '2px solid red'
                }
                name={name}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                type={type}
                value={value}
            />
        </MainContainer>
    );
};

export default SettingsInputTextField;
