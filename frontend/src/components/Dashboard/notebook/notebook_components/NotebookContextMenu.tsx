import React from 'react';
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

//Redux:
import { connect } from 'react-redux';
import {
    deleteNote,
    deleteFolder,
} from '../../../../redux/userNotebook/notebookActions';

//Styles:

import { Trash } from '@styled-icons/boxicons-regular/Trash';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';

const TrashIcon = styled(Trash)`
    height: 1.4rem;
    width: 1.4rem;
    color: inherit;
`;

const EditIcon = styled(EditAlt)`
    height: 1.4rem;
    width: 1.4rem;
    color: inherit;
`;

const IconSeparator = styled.div`
    width: 0.5rem;
`;

//Interfaces:

interface IDispatchProps {
    deleteNote: (entityId: string, entityParentId: string) => void;
    deleteFolder: (entityId: string, entityParentId: string) => void;
}
interface IComponentProps {
    id: string | number;
}

type NotebookContextMenuProps = IDispatchProps & IComponentProps;

const NotebookContextMenu = ({
    id,
    deleteFolder,
    deleteNote,
}: NotebookContextMenuProps): JSX.Element => {
    const itemRenameHandler = (props: any) => {
        const itemProps = props.props;
        itemProps.openRenameModal();
    };

    const itemDeletionHandler = (props: any) => {
        const itemProps = props.props;
        const { entityId, entityParentId, entityType } = itemProps;
        itemProps.openDeleteModal();

        // switch (entityType) {
        //     case 'FOLDER':
        //         deleteFolder(entityId, entityParentId);
        //         break;
        //     case 'NOTE':
        //         deleteNote(entityId, entityParentId);
        //         break;
        //     default:
        //         throw new Error(
        //             'No entity type was passed. Item was not deleted.'
        //         );
        // }
    };

    return (
        <Menu id={id} theme={theme.light} animation={animation.slide}>
            <Item onClick={itemRenameHandler}>
                <EditIcon />
                <IconSeparator />
                Rename
            </Item>
            <Separator />
            <Item onClick={itemDeletionHandler}>
                <TrashIcon />
                <IconSeparator />
                Delete
            </Item>
        </Menu>
    );
};

export default connect(null, { deleteFolder, deleteNote })(NotebookContextMenu);
