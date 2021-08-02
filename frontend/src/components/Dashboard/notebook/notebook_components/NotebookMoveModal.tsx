import React, { useEffect, useState } from 'react';

//Components:
import Modal from '@material-ui/core/Modal';
import GeneralButton from '../../general_components/GeneralButton';
import SelectDropdown from './SelectDropdown';

//Redux:
import { connect } from 'react-redux';
import { getNotebook } from '../../../../redux/userNotebook/notebookActions';

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

    return (
        <Modal open={openState} onClose={closeFunc}>
            <ModalContainer>
                <ModalHeader>Move Item</ModalHeader>
                <ModalDescText>
                    Please select where you want to move this item.
                </ModalDescText>
                <DropdownContainer>
                    <SelectDropdown optionEntities={notebook.rootFolders} />
                </DropdownContainer>
                <ButtonContainer>
                    <GeneralButton
                        buttonLabel="Cancel"
                        buttonBackground="rgba(0, 0, 34, 0.1)"
                        buttonTextColor="rgba(5, 5, 20, 0.7)"
                        width="5rem"
                        onClick={closeFunc}
                    />
                    <ButtonSpacer />
                    <GeneralButton width="5rem" buttonLabel="Move" />
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

export default connect(mapStateToProps, { getNotebook })(NotebookMoveModal);
