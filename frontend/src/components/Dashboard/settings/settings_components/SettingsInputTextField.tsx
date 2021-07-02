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

const InputTextField = styled.input`
    border: 2px solid #e8e8e8;
    width: 100%;
    border-radius: 0.2em;
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.text};
`;

//Interface:
interface ISettingsInputTextField {
    name?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

const SettingsInputTextField = ({
    name,
    label,
    onChange,
    disabled,
}: ISettingsInputTextField): JSX.Element => {
    return (
        <MainContainer>
            <InputLabel>{label}</InputLabel>
            <InputSpacer />
            <InputTextField
                name={name}
                onChange={onChange}
                disabled={disabled}
            />
        </MainContainer>
    );
};

export default SettingsInputTextField;
