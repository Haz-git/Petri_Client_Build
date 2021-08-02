import React, { useEffect, useState } from 'react';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';

//Redux:
import { connect } from 'react-redux';
import { getNotebook } from '../../../../redux/userNotebook/notebookActions';

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
import NotebookSearchDropdown from '../notebook_components/NotebookSearchDropdown';

//Interfaces:

interface IDispatchProps {
    getNotebook: (statusCallback: (status: boolean) => void) => void;
}

interface IMapStateToProps {
    notebook: { rootFiles: any; rootFolders: any };
}

interface IComponentProps {
    openState: boolean;
    closeFunc: () => void;
    entityType?: string;
    entityName?: string;
    entityParentId?: string;
    entityId?: string;
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
    getNotebook,
    notebook,
}: NotebookMoveModalProps): JSX.Element => {
    const [isNotebookLoaded, setIsNotebookLoaded] = useState(false);

    //Loaded State handler
    const setLoadedStatus = (status: boolean) => setIsNotebookLoaded(status);

    console.log(notebook);

    return (
        <Modal open={openState} onClose={closeFunc}>
            <ModalContainer>
                <ModalHeader>Move Item</ModalHeader>
                <ModalDescText>
                    Please select the new location of your item.
                </ModalDescText>
                <NotebookSearchDropdown notebookEntities={notebook} />
            </ModalContainer>
        </Modal>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { getNotebook })(NotebookMoveModal);
