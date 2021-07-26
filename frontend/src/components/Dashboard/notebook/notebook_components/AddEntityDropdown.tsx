import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

//Redux:
import { connect } from 'react-redux';
import {
    createNewNote,
    createNewFolder,
} from '../../../../redux/userNotebook/notebookActions';
import { toggleSnackbarOpen } from '../../../../redux/snackBar/snackBarActions';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import OutsideClickHandler from 'react-outside-click-handler';

//Styles:
import { Add } from '@styled-icons/material/Add';
import { FileEarmarkText } from '@styled-icons/bootstrap/FileEarmarkText';
import { Folder2 } from '@styled-icons/bootstrap/Folder2';

const DocumentIcon = styled(FileEarmarkText)`
    color: #423c3c;
    height: 1.3rem;
    width: 1.3rem;
`;

const FolderIcon = styled(Folder2)`
    color: #423c3c;
    height: 1.3rem;
    width: 1.3rem;
`;

const AddIcon = styled(Add)`
    color: #ffffff;
    height: 1.5rem;
    width: 1.5rem;
`;

const openAnimation = keyframes`
    from {
        opacity: 0;
        transform: scaleY(.7);
        height: 0;
    }

    to {
        opacity: 1;
        transform: scaleY(1);
        height: 7rem;
    }
`;

const closeAnimation = keyframes`
    from {
        opacity: 1;
        transform: scaleY(1);
        height: 7rem;
    }

    to {
        opacity: 0;
        transform: scaleY(.9);
        height: 0;
    }
`;

const MainContainer = styled.div`
    position: relative;
`;

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    background: #ffffff;
    z-index: 99 !important;
    border: 1px solid #ececec;
    border-radius: 0.4rem;
    padding: 0.5rem 0.5rem;
    visibility: ${(props) => props.isVisible};
    animation: ${({ isVisible }) =>
            isVisible === 'visible' ? openAnimation : closeAnimation}
        150ms ease-in forwards;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;

    width: 9rem;
`;

//Interfaces:

interface AddEntityDropdownProps {
    createNewNote: (
        name: string,
        htmlState: any,
        parentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    createNewFolder: (
        folderName: string,
        parentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    toggleSnackbarOpen: (message: string) => void;
}

const AddEntityDropdown = ({
    createNewNote,
    createNewFolder,
    toggleSnackbarOpen,
}: AddEntityDropdownProps): JSX.Element => {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const toggleBtnLoading = (status: boolean) => setIsButtonLoading(status);

    const currentPathLocation = useLocation();

    const detectFilePath = () => {
        if (
            currentPathLocation.pathname === '/notebook' &&
            currentPathLocation.pathname.slice(9) === ''
        ) {
            return 'root';
        } else {
            return currentPathLocation.pathname.slice(10);
        }
    };

    const handleCreateNewNote = () => {
        setShowDropdown(false);
        toggleBtnLoading(true);
        const parentId = detectFilePath();
        const name = 'Untitled note';
        const htmlState = '';
        createNewNote(
            name,
            htmlState,
            parentId,
            toggleSnackbarOpen,
            toggleBtnLoading
        );
    };

    const handleCreateNewFolder = () => {
        setShowDropdown(false);
        toggleBtnLoading(true);
        const parentId = detectFilePath();
        const name = 'Untitled folder';
        createNewFolder(name, parentId, toggleSnackbarOpen, toggleBtnLoading);
    };

    return (
        <MainContainer>
            <GeneralButton
                buttonLabel={isButtonLoading === true ? 'Adding...' : 'Add New'}
                buttonIcon={isButtonLoading === true ? null : <AddIcon />}
                fontSize="1.2em"
                onClick={toggleDropdown}
                hoverTransform="none"
                isDisabledOnLoading={isButtonLoading}
            />
            <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
                <DropdownContainer
                    isVisible={showDropdown === true ? 'visible' : 'hidden'}
                >
                    <GeneralButton
                        buttonLabel="Folder"
                        disableShadow={true}
                        buttonIcon={<FolderIcon />}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="1rem"
                        fontSize="1.1em"
                        hoverColor="#ececec"
                        fontWeight="400"
                        hoverShadow="none"
                        onClick={handleCreateNewFolder}
                    />
                    <GeneralButton
                        buttonLabel="Note"
                        disableShadow={true}
                        buttonIcon={<DocumentIcon />}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="1rem"
                        fontSize="1.1em"
                        hoverColor="#ececec"
                        fontWeight="400"
                        hoverShadow="none"
                        onClick={handleCreateNewNote}
                    />
                </DropdownContainer>
            </OutsideClickHandler>
        </MainContainer>
    );
};

export default connect(null, {
    createNewNote,
    createNewFolder,
    toggleSnackbarOpen,
})(AddEntityDropdown);
