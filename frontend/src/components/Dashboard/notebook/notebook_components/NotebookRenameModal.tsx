import React, { useState } from 'react';
import { deviceMin } from '../../../../devices/breakpoints';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';
import GeneralTextField from '../../general_components/GeneralTextField';

//Redux:
import { connect } from 'react-redux';
import {
    renameNote,
    renameFolder,
} from '../../../../redux/userNotebook/notebookActions';

//Styles:
import styled, { keyframes } from 'styled-components';
import {
    fadein,
    ModalHeader,
} from '../../settings/settings_components/ProfilePictureModal';

export const ModalContainer = styled.div`
    margin: 0 auto;
    width: 22rem;
    padding: 2rem 2rem;
    position: relative;
    top: 45%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: white;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    animation: ${fadein} 0.4s ease-in-out;
`;

const TextFieldContainer = styled.div`
    text-align: left;
    margin-top: 1rem;
    width: 100%;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    text-align: right;
    margin-top: 1rem;
`;

export const ButtonSpacer = styled.div`
    width: 0.5rem;
`;

//Interfaces:

/* entityId is defined as string | undefined, but will always be a string. This is because we conditionally select the folderId or noteId depending on which one there is.*/

interface IComponentProps {
    openState: boolean;
    closeFunc: () => void;
    entityId: string | undefined;
    entityParentId: string;
    entityName: string;
    entityType: string;
}

interface IDispatchProps {
    renameNote: (
        noteId: string,
        parentId: string,
        requestType: string,
        updatedHTMLState: string,
        updatedNoteName: string
    ) => void;
    renameFolder: (
        folderId: string,
        parentId: string,
        newFolderName: string
    ) => void;
}

type NotebookRenameModalProps = IComponentProps & IDispatchProps;

const NotebookRenameModal = ({
    openState,
    closeFunc,
    entityId,
    entityParentId,
    entityName,
    entityType,
    renameNote,
    renameFolder,
}: NotebookRenameModalProps): JSX.Element => {
    const [newEntityName, setNewEntityName] = useState('');
    const [inputHasError, setInputHasError] = useState(false);

    const handleRenameUserInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (inputHasError === true) setInputHasError(false);
        setNewEntityName(e.currentTarget.value);
    };

    const handleRenameAction = () => {
        switch (entityType) {
            case 'NOTE':
                if (newEntityName !== '') {
                    renameNote(
                        entityId as any,
                        entityParentId,
                        'UPDATE_NAME',
                        'None',
                        newEntityName
                    );

                    closeFunc();
                } else {
                    setInputHasError(true);
                }
                break;
            case 'FOLDER':
                if (newEntityName !== '') {
                    renameFolder(
                        entityId as any,
                        entityParentId,
                        newEntityName
                    );

                    closeFunc();
                } else {
                    setInputHasError(true);
                }
                break;
            default:
                throw new Error(
                    'No entityType was specified for rename request.'
                );
        }
    };

    return (
        <>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>
                    <ModalHeader>Rename</ModalHeader>
                    <TextFieldContainer>
                        <GeneralTextField
                            placeholder={entityName}
                            onChange={handleRenameUserInput}
                            hasError={inputHasError}
                        />
                    </TextFieldContainer>
                    <ButtonContainer>
                        <GeneralButton
                            buttonLabel="Cancel"
                            buttonBackground="rgba(0, 0, 34, 0.1)"
                            buttonTextColor="rgba(5, 5, 20, 0.7)"
                            width="5rem"
                            onClick={closeFunc}
                        />
                        <ButtonSpacer />
                        <GeneralButton
                            buttonLabel="Rename"
                            width="5rem"
                            onClick={handleRenameAction}
                        />
                    </ButtonContainer>
                </ModalContainer>
            </Modal>
        </>
    );
};

export default connect(null, { renameNote, renameFolder })(NotebookRenameModal);
