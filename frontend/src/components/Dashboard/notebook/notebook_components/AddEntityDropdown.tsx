import React, { useState } from 'react';
import styled from 'styled-components';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import OutsideClickHandler from 'react-outside-click-handler';

//Styles:
import { Add } from '@styled-icons/material/Add';
import { FileEarmarkText } from '@styled-icons/bootstrap/FileEarmarkText';
import { Folder2 } from '@styled-icons/bootstrap/Folder2';

const DocumentIcon = styled(FileEarmarkText)`
    color: #423c3c;
    height: 1rem;
    width: 1rem;
`;

const FolderIcon = styled(Folder2)`
    color: #423c3c;
    height: 1rem;
    width: 1rem;
`;

const AddIcon = styled(Add)`
    color: #ffffff;
    height: 1.5rem;
    width: 1.5rem;
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
    right: 0;
    top: 0;
    background: #ffffff;
    z-index: 99 !important;
    border: 1px solid #ececec;
    border-radius: 0.4rem;
    padding: 0.75rem 0.75rem;
    visibility: ${(props) => props.isVisible};
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

//Interfaces:

const AddEntityDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <MainContainer>
            <GeneralButton
                buttonLabel="Add New"
                buttonIcon={<AddIcon />}
                fontSize="1.2em"
                onClick={toggleDropdown}
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
                        iconMargin=".5rem"
                        fontSize="1em"
                        hoverColor="#ececec"
                    />
                    <GeneralButton
                        buttonLabel="Note"
                        disableShadow={true}
                        buttonIcon={<DocumentIcon />}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin=".5rem"
                        fontSize="1em"
                        hoverColor="#ececec"
                    />
                </DropdownContainer>
            </OutsideClickHandler>
        </MainContainer>
    );
};

export default AddEntityDropdown;
