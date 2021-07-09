import React from 'react';
import styled from 'styled-components';
import { FileUpload } from '@styled-icons/material/FileUpload';

const FileUploadIcon = styled(FileUpload)`
    height: 1.4rem;
    width: 1.4rem;
    color: #ffffff;
    margin-left: 0.2rem;
`;

const MainContainer = styled.div`
    max-height: 2.5rem;
`;

const LabelWrapper = styled.label`
    border: none;
    background: #222444;
    padding: 0.5rem 0.8rem;
    border-radius: 0.4rem;
    font-family: 'Lato', sans-serif;
    font-size: 0.9em;
    font-weight: 600;
    color: #ffffff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    overflow: hidden;
    cursor: pointer;

    transition: all 0.1s ease-in;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: scale(1.05);
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

//Interface:

interface IFileInputProps {
    onUpload?: React.ChangeEventHandler<HTMLInputElement>;
}

const FileInput = ({ onUpload }: IFileInputProps): JSX.Element => {
    return (
        <MainContainer>
            <LabelWrapper>
                Upload file
                <FileUploadIcon />
                <HiddenFileInput
                    type="file"
                    onChange={onUpload}
                    accept="image/*"
                />
            </LabelWrapper>
        </MainContainer>
    );
};

export default FileInput;
