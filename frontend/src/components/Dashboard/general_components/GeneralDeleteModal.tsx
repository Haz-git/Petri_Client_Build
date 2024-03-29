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
}

const GeneralDeleteModal = ({
    openState,
    closeFunc,
    deleteHandler,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <Modal open={openState} onClose={closeFunc}>
                <ModalContainer>
                    <ModalHeader>Confirm Deletion?</ModalHeader>
                    <ModalDescText>
                        This item and everything it holds will be permanently
                        deleted.
                    </ModalDescText>
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
                            buttonLabel="Delete"
                            buttonBackground="#D7002E"
                            width="5rem"
                            onClick={deleteHandler}
                        />
                    </ButtonContainer>
                </ModalContainer>
            </Modal>
        </>
    );
};

export default GeneralDeleteModal;
