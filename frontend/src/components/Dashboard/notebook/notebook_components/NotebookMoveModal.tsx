import React from 'react';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';

//Styles:
import {
    ModalHeader,
    ModalDescText,
} from '../../settings/settings_components/ProfilePictureModal';
import {
    ModalContainer,
    ButtonContainer,
    ButtonSpacer,
    Divider,
} from '../notebook_components/NotebookRenameModal';

//Interfaces:
interface IComponentProps {
    openState: boolean;
    closeFunc: () => void;
    deleteHandler: () => void;
}

const NotebookMoveModal = ({
    openState,
    closeFunc,
    deleteHandler,
}: IComponentProps): JSX.Element => {
    return (
        <Modal open={openState} onClose={closeFunc}>
            <ModalContainer>
                <ModalHeader>Move Item</ModalHeader>
                <ModalDescText>
                    Please select the new location of your item.
                </ModalDescText>
            </ModalContainer>
        </Modal>
    );
};

export default NotebookMoveModal;
