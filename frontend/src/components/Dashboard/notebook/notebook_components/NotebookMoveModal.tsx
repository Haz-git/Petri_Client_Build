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
    entityType?: string;
    entityName?: string;
    entityParentId?: string;
    entityId?: string;
}

const NotebookMoveModal = ({
    openState,
    closeFunc,
    entityType,
    entityId,
    entityName,
    entityParentId,
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
