import React from 'react';
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

//Styles:

import { Trash } from '@styled-icons/boxicons-regular/Trash';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { Star } from '@styled-icons/boxicons-regular/Star';
import { Export } from '@styled-icons/boxicons-regular/Export';

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

const StarIcon = styled(Star)`
    height: 1.4rem;
    width: 1.4rem;
    color: inherit;
`;

const MoveIcon = styled(Export)`
    height: 1.4rem;
    width: 1.4rem;
    color: inherit;
`;

const IconSeparator = styled.div`
    width: 0.5rem;
`;

const StyledMenu = styled(Menu)`
    .react-contexify__separator {
        background: #dfdfdf;
    }
    .react-contexify__item {
        color: #81898f;
        font-size: 1em;
        font-weight: 500;
        font-family: 'Lato';
    }

    .react-contexify__item:not(.react-contexify__item--disabled):hover
        > .react-contexify__item__content,
    .react-contexify__item:not(.react-contexify__item--disabled):focus
        > .react-contexify__item__content {
        background-color: rgba(66, 99, 235, 0.85);
    }
`;

//Interfaces:

interface IComponentProps {
    id: string | number;
}

type NotebookContextMenuProps = IComponentProps;

const NotebookContextMenu = ({ id }: NotebookContextMenuProps): JSX.Element => {
    const itemRenameHandler = (props: any) => {
        const { openRenameModal } = props.props;
        openRenameModal();
    };

    const itemDeletionHandler = (props: any) => {
        const { openDeleteModal } = props.props;
        openDeleteModal();
    };

    const itemStarredHandler = (props: any) => {
        const {
            entityType,
            entityId,
            entityParentId,
            entityStarredStatus,
            updateNoteStarredStatus,
            updateFolderStarredStatus,
        } = props.props;

        switch (entityType) {
            case 'NOTE':
                if (entityStarredStatus !== 'TRUE') {
                    return updateNoteStarredStatus(
                        entityId,
                        entityParentId,
                        'ADD_NOTE_TO_STARRED'
                    );
                }
                return updateNoteStarredStatus(
                    entityId,
                    entityParentId,
                    'REMOVE_NOTE_FROM_STARRED'
                );
            case 'FOLDER':
                if (entityStarredStatus !== 'TRUE') {
                    return updateFolderStarredStatus(
                        entityId,
                        entityParentId,
                        'ADD_FOLDER_TO_STARRED'
                    );
                }
                return updateFolderStarredStatus(
                    entityId,
                    entityParentId,
                    'REMOVE_FOLDER_FROM_STARRED'
                );

            default:
                throw new Error(
                    'Something went wrong starring/unstarring your notebook entity. No entityType was provided.'
                );
        }
    };

    const itemMoveHandler = (props: any) => {
        const { openMoveModal } = props.props;
        openMoveModal();
    };

    return (
        <StyledMenu id={id} animation={animation.fade}>
            <Item onClick={itemRenameHandler}>
                <EditIcon />
                <IconSeparator />
                Rename
            </Item>
            <Separator />
            <Item onClick={itemMoveHandler}>
                <MoveIcon />
                <IconSeparator />
                Move
            </Item>
            <Separator />
            <Item onClick={itemStarredHandler}>
                <StarIcon />
                <IconSeparator />
                Star / Unstar
            </Item>
            <Separator />
            <Item onClick={itemDeletionHandler}>
                <TrashIcon />
                <IconSeparator />
                Delete
            </Item>
        </StyledMenu>
    );
};

export default NotebookContextMenu;
