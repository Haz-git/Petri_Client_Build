import React, { useEffect, useState } from 'react';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';
import SelectDropdown from './SelectDropdown';

//Redux:
import { connect } from 'react-redux';
import {
    moveNote,
    moveFolder,
} from '../../../../redux/userNotebook/notebookActions';
import { toggleSnackbarOpen } from '../../../../redux/snackBar/snackBarActions';

//Styles:
import styled from 'styled-components';
import {
    ModalHeader,
    ModalDescText,
} from '../../settings/settings_components/ProfilePictureModal';
import {
    ModalContainer,
    ButtonContainer,
    ButtonSpacer,
} from '../notebook_components/NotebookRenameModal';
import NotebookSearchDropdown from '../notebook_components/NotebookSearchDropdown';

const DropdownContainer = styled.div`
    padding: 1rem 0rem;
    text-align: left;
`;

//Interfaces:

interface IDispatchProps {
    moveNote: (
        noteId: string,
        parentId: string,
        targetParentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    moveFolder: (
        noteId: string,
        parentId: string,
        targetParentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    toggleSnackbarOpen: (message: string) => void;
}

interface IMapStateToProps {
    notebook: { rootFiles: any; rootFolders: any };
}

interface IComponentProps {
    openState: boolean;
    closeFunc: () => void;
    entityType: string;
    entityName: string;
    entityParentId: string;
    entityId: string;
}

type NotebookMoveModalProps = IDispatchProps &
    IMapStateToProps &
    IComponentProps;

const NotebookMoveModal = ({
    openState,
    closeFunc,
    entityType,
    entityId,
    entityName,
    entityParentId,
    moveNote,
    moveFolder,
    notebook,
    toggleSnackbarOpen,
}: NotebookMoveModalProps): JSX.Element => {
    //Loader State:
    const [isNotebookLoaded, setIsNotebookLoaded] = useState(false);

    //Button State:
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //SelectDropdown states:
    const [selectValue, setSelectValue] = useState('');

    //Loaded State handler
    const setLoadedStatus = (status: boolean) => setIsNotebookLoaded(status);

    //Selected value handler:
    const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value);
    };

    //Button handler:
    const toggleButtonState = (status: boolean) => setIsButtonDisabled(status);

    //Submission handler
    const onMoveSubmission = () => {
        switch (entityType) {
            case 'FOLDER':
                if (selectValue !== '' && selectValue !== entityParentId) {
                    toggleButtonState(true);
                    moveFolder(
                        entityId,
                        entityParentId,
                        selectValue,
                        toggleSnackbarOpen,
                        toggleButtonState
                    );
                }
                break;
            case 'NOTE':
                if (selectValue !== '' && selectValue !== entityParentId) {
                    toggleButtonState(true);
                    moveNote(
                        entityId,
                        entityParentId,
                        selectValue,
                        toggleSnackbarOpen,
                        toggleButtonState
                    );
                }
                break;
            default:
                throw new Error(
                    'onMoveSubmission Error. Your item has not been moved.'
                );
        }
    };

    return (
        <Modal open={openState} onClose={closeFunc}>
            <ModalContainer>
                <ModalHeader>Move Item</ModalHeader>
                <ModalDescText>
                    Please select where you want to move this item.
                </ModalDescText>
                <DropdownContainer>
                    <SelectDropdown
                        optionEntities={notebook.rootFolders}
                        onChangeHandler={handleUserSelection}
                    />
                </DropdownContainer>
                <ButtonContainer>
                    <GeneralButton
                        buttonLabel="Cancel"
                        buttonBackground="rgba(0, 0, 34, 0.1)"
                        buttonTextColor="rgba(5, 5, 20, 0.7)"
                        width="6rem"
                        onClick={closeFunc}
                    />
                    <ButtonSpacer />
                    <GeneralButton
                        width="6rem"
                        buttonLabel={
                            isButtonDisabled === true ? 'Moving..' : 'Move'
                        }
                        isDisabledOnLoading={isButtonDisabled}
                        onClick={onMoveSubmission}
                    />
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, {
    moveNote,
    moveFolder,
    toggleSnackbarOpen,
})(NotebookMoveModal);
