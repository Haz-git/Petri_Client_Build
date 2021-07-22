import React from 'react';
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

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

interface IComponentProps {
    id: string | number;
}

type NotebookContextMenuProps = IComponentProps;

const NotebookContextMenu = ({ id }: NotebookContextMenuProps): JSX.Element => {
    const itemRenameHandler = (props: any) => {
        const itemProps = props.props;
        itemProps.openRenameModal();
    };

    const itemDeletionHandler = (props: any) => {
        const itemProps = props.props;
        itemProps.openDeleteModal();
    };

    return (
        <Menu id={id} theme={theme.light} animation={animation.fade}>
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

export default NotebookContextMenu;
