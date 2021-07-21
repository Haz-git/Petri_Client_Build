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
    const itemHandler = (props: any) => {
        const itemProps = props.props;
        const { entityId, entityName, entityParentId, entityType } = itemProps;

        switch (entityType) {
            case 'FOLDER':
                deleteFolder(entityId, entityParentId);
                break;
            case 'NOTE':
                deleteNote(entityId, entityParentId);
                break;
            default:
                throw new Error('No entity type was passed.');
        }
    };

    return (
        <Menu id={id} theme={theme.light} animation={animation.fade}>
            <Item onClick={itemHandler}>Delete</Item>
            <Separator />
            <Item>Item2</Item>
            <Separator />
            <Item>Item3</Item>
        </Menu>
    );
};

export default connect(null, { deleteFolder, deleteNote })(NotebookContextMenu);
