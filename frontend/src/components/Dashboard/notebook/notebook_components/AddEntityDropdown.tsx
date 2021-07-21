import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

//Redux:
import { connect } from 'react-redux';
import {
    createNewNote,
    createNewFolder,
} from '../../../../redux/userNotebook/notebookActions';

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
    createNewNote: (name: string, htmlState: any, parentId: string) => void;
    createNewFolder: (folderName: string, parentId: string) => void;
}

const AddEntityDropdown = ({
    createNewNote,
    createNewFolder,
}: AddEntityDropdownProps): JSX.Element => {
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

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
        const parentId = detectFilePath();
        const name = 'Untitled note';
        const htmlState = 'TempState';
        createNewNote(name, htmlState, parentId);
        setShowDropdown(false);
    };

    const handleCreateNewFolder = () => {
        const parentId = detectFilePath();
        const name = 'Untitled folder';
        createNewFolder(name, parentId);
        setShowDropdown(false);
    };

    return (
        <MainContainer>
            <GeneralButton
                buttonLabel="Add New"
                buttonIcon={<AddIcon />}
                fontSize="1.2em"
                onClick={toggleDropdown}
                hoverTransform="none"
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

export default connect(null, { createNewNote, createNewFolder })(
    AddEntityDropdown
);
