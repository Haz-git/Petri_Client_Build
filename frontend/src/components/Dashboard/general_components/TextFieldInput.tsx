import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

//Interface:

interface ITextField {
    name?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    variant?: 'standard' | 'filled' | 'outlined' | undefined;
    placeholder?: string;
    InputLabelProps?: {};
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    helperText?: string;
    size?: 'small' | 'medium' | undefined;
}

const TextFieldInput = ({
    name,
    disabled,
    id,
    label,
    variant,
    placeholder,
    InputLabelProps,
    onChange,
    helperText,
    size,
}: ITextField): JSX.Element => {
    return (
        <>
            <TextField
                name={name}
                disabled={disabled}
                id={id}
                label={label}
                variant={variant}
                placeholder={placeholder}
                InputLabelProps={InputLabelProps}
                helperText={helperText}
                onChange={onChange}
                size={size}
            />
        </>
    );
};

export default TextFieldInput;
