import React, { useState } from 'react';
import styled from 'styled-components';

import { useContextMenu } from 'react-contexify';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import NotebookContextMenu from './NotebookContextMenu';
import historyObject from '../../../../historyObject';

import NotebookRenameModal from './NotebookRenameModal';
import GeneralDeleteModal from '../../general_components/GeneralDeleteModal';

//Redux:
import { connect } from 'react-redux';
import { toggleSnackbarOpen } from '../../../../redux/snackBar/snackBarActions';
import {
    deleteNote,
    deleteFolder,
} from '../../../../redux/userNotebook/notebookActions';

//Icons:

import { FileEarmarkText } from '@styled-icons/bootstrap/FileEarmarkText';
import { Folder2 } from '@styled-icons/bootstrap/Folder2';

const DocumentIcon = styled(FileEarmarkText)`
    color: #423c3c;
    height: 1.5rem;
    width: 1.5rem;
`;

const FolderIcon = styled(Folder2)`
    color: #423c3c;
    height: 1.5rem;
    width: 1.5rem;
`;

//Styles:

const MainContainer = styled.div`
    padding: 1rem 1rem;
    border-bottom: 1px solid #cabbbb;
    background: ${({ isSelected }) =>
        isSelected === true ? 'rgba(66, 99, 235, .2)' : 'none'};
    cursor: default;
`;

const IconContainer = styled.div`
    margin-right: 0.5rem;
`;

const EntityContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
`;

const EntityNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const EntityNameText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 900;
    margin-top: 0.2rem;
    color: ${({ isSelected }) =>
        isSelected === true ? 'rgba(66, 99, 235, 1)' : '#3c4042'};
`;

const EntityDetails = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 400;
    color: ${({ isSelected }) =>
        isSelected === true ? 'rgba(66, 99, 235, 1)' : '#81898f'};
`;

//Interface:

interface IDispatchProps {
    deleteNote: (
        noteId: string,
        parentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    deleteFolder: (
        folderId: string,
        parentId: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
    toggleSnackbarOpen: (message: string) => void;
}

interface IComponentProps {
    noteId: string | undefined;
    noteName: string;
    folderName: string;
    folderId: string | undefined;
    parentId: string;
    ownerName?: string;
    dateCreated?: string;
    dateModified?: string;
    onClickSelection: () => void;
    isSelected?: boolean;
}

type NotebookEntityProps = IDispatchProps & IComponentProps;

const NotebookEntity = ({
    noteId,
    folderId,
    noteName,
    folderName,
    parentId,
    dateCreated,
    dateModified,
    ownerName,
    deleteFolder,
    deleteNote,
    toggleSnackbarOpen,
    isSelected,
    onClickSelection,
}: NotebookEntityProps): JSX.Element => {
    dayjs.extend(relativeTime);

    //Button Loading states:
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    //Modal states:
    const [stateRenameModal, setStateRenameModal] = useState(false);
    const [stateDeleteModal, setStateDeleteModal] = useState(false);

    //Button Handler:
    const setButtonState = (status: boolean) => setIsButtonLoading(status);

    //Rename Modal handler:
    const openRenameModal = () => {
        setStateRenameModal(true);
    };

    const closeRenameModal = () => {
        setStateRenameModal(false);
    };

    //Delete Modal Handler:
    const openDeleteModal = () => {
        setStateDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setStateDeleteModal(false);
    };

    const MENU_ID = 'NOTEBOOKCONTEXTMENU';
    const { show } = useContextMenu({
        id: MENU_ID,
        props: {
            openRenameModal,
            closeRenameModal,
            openDeleteModal,
            closeDeleteModal,
        },
    });

    const truncateName = (entityName: string) => {
        if (entityName.length > 25) {
            return entityName.substr(0, 25).concat('...');
        } else {
            return entityName;
        }
    };

    const parseName = () => {
        if (folderId !== undefined) {
            return truncateName(folderName);
        }

        return truncateName(noteName);
    };

    const parseIcon = () => {
        if (noteId !== undefined) {
            return <DocumentIcon />;
        }

        return <FolderIcon />;
    };

    const parseDateCreated = () => {
        return dayjs(dateCreated).format('MM/DD/YYYY');
    };

    const parseLastModified = () => {
        let currTime = dayjs();
        return dayjs(dateModified).from(currTime);
    };

    const displayContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        show(event);
    };

    //Current Entity values:
    const NotebookEntity = {
        entityId: folderId === undefined ? noteId : folderId,
        entityParentId: parentId,
        entityName: folderName === undefined ? noteName : folderName,
        entityType: folderId === undefined ? 'NOTE' : 'FOLDER',
    };

    const entityDeletionConfirmationHandler = () => {
        setButtonState(true);
        switch (NotebookEntity.entityType) {
            case 'FOLDER':
                deleteFolder(
                    NotebookEntity.entityId as any,
                    NotebookEntity.entityParentId,
                    toggleSnackbarOpen,
                    setButtonState
                );
                break;
            case 'NOTE':
                deleteNote(
                    NotebookEntity.entityId as any,
                    NotebookEntity.entityParentId,
                    toggleSnackbarOpen,
                    setButtonState
                );
                break;
            default:
                throw new Error(
                    'No entity type was passed. Item was not deleted.'
                );
        }

        closeDeleteModal();
    };

    const EntityClickHandler = (e: React.MouseEvent) => {
        //Treat single click and double clicks differently:

        if (e.detail === 1) {
            onClickSelection();
        } else if (e.detail === 2) {
            //Highlight the entity:
            onClickSelection();

            if (NotebookEntity.entityType === 'NOTE') {
                //Access Note editing mode:
                historyObject.push(`/notebook/note/${NotebookEntity.entityId}`);
            } else if (NotebookEntity.entityType === 'FOLDER') {
                //Access contents of folder:
                historyObject.push(`/notebook/${NotebookEntity.entityId}`);
            }
        }
    };

    return (
        <>
            <GeneralDeleteModal
                openState={stateDeleteModal}
                closeFunc={closeDeleteModal}
                deleteHandler={entityDeletionConfirmationHandler}
            />
            <NotebookRenameModal
                openState={stateRenameModal}
                closeFunc={closeRenameModal}
                entityId={NotebookEntity.entityId}
                entityParentId={NotebookEntity.entityParentId}
                entityName={NotebookEntity.entityName}
                entityType={NotebookEntity.entityType}
                snackbar={toggleSnackbarOpen}
            />
            <MainContainer
                onContextMenu={displayContextMenu}
                isSelected={isSelected}
                onClick={EntityClickHandler}
            >
                <EntityContainer>
                    <EntityNameContainer>
                        <IconContainer>{parseIcon()}</IconContainer>
                        <EntityNameText isSelected={isSelected}>
                            {parseName()}
                        </EntityNameText>
                    </EntityNameContainer>
                    <EntityDetails isSelected={isSelected}>
                        {ownerName}
                    </EntityDetails>
                    <EntityDetails isSelected={isSelected}>
                        {parseDateCreated()}
                    </EntityDetails>
                    <EntityDetails isSelected={isSelected}>
                        {parseLastModified()}
                    </EntityDetails>
                </EntityContainer>
            </MainContainer>
        </>
    );
};

export default connect(null, { deleteNote, deleteFolder, toggleSnackbarOpen })(
    NotebookEntity
);
