import React from 'react';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from './GeneralButton';

//Styles:
import styled, { keyframes } from 'styled-components';
import {
    fadein,
    ModalHeader,
    ModalDescText,
} from '../settings/settings_components/ProfilePictureModal';
import {
    ModalContainer,
    ButtonContainer,
    ButtonSpacer,
    Divider,
} from '../notebook/notebook_components/NotebookRenameModal';

//Interfaces:
interface IComponentProps {
    openState: boolean;
    closeFunc: () => void;
    deleteHandler: () => void;
    modalHeader: string;
    modalDesc: string;
}

const GeneralConfirmationModal = ({
    openState,
    closeFunc,
    deleteHandler,
    modalHeader,
    modalDesc,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalDescText>{modalDesc}</ModalDescText>
                    <Divider />
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
                            buttonLabel="Leave"
                            width="5rem"
                            onClick={deleteHandler}
                        />
                    </ButtonContainer>
                </ModalContainer>
            </Modal>
        </>
    );
};

export default GeneralConfirmationModal;
