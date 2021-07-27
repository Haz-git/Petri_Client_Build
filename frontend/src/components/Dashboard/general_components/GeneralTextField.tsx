import React from 'react';
import styled from 'styled-components';

//Styles:

const StyledTextInput = styled.input<GeneralTextFieldProps>`
    /* border: 2px solid #909090; */
    border: ${(props) => props.hasError};
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0.4rem;
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    opacity: 1;
    background: #f9f9f9;

    &:focus {
        /* background: #ffffff; */
        border: 1px solid #4263eb;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    }

    &::placeholder {
        color: #3c4042;
    }
`;

//Interfaces:
interface GeneralTextFieldProps {
    name?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    value?: string;
    hasError?: boolean;
    onKeyPress?: (e: React.KeyboardEvent) => void;
}

const GeneralTextField = ({
    name,
    label,
    onChange,
    disabled,
    placeholder,
    type,
    value,
    hasError = false,
    onKeyPress,
}: GeneralTextFieldProps): JSX.Element => {
    return (
        <div>
            <StyledTextInput
                hasError={
                    hasError === false
                        ? '1px solid #dfdfdf'
                        : '1px solid #D7002E'
                }
                name={name}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                type={type}
                value={value}
                onKeyPress={onKeyPress}
            />
        </div>
    );
};

export default GeneralTextField;
