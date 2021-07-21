import React from 'react';
import styled from 'styled-components';

import { useContextMenu } from 'react-contexify';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import ContextMenu from './ContextMenu';

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
`;

const IconContainer = styled.div`
    margin-right: 0.5rem;
`;

const EntityContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 2fr));
`;

const EntityNameContainer = styled.div`
    display: flex;
    align-items: center;
`;

const EntityNameText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 900;
    color: #3c4042;
    margin-top: 0.2rem;
`;

const EntityDetails = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 400;
    color: #81898f;
`;
//Interface:

interface MainNotebookProps {
    noteId?: string;
    noteName: string;
    folderName: string;
    folderId?: string;
    parentId?: string;
    ownerName?: string;
    dateCreated?: string;
    dateModified?: string;
}

const NotebookEntity = ({
    noteId,
    folderId,
    noteName,
    folderName,
    parentId,
    dateCreated,
    dateModified,
    ownerName,
}: MainNotebookProps): JSX.Element => {
    dayjs.extend(relativeTime);

    const MENU_ID = 'NOTEBOOKCONTEXTMENU';
    const { show } = useContextMenu({
        id: MENU_ID,
    });

    const truncateName = (entityName: string) => {
        if (entityName.length > 20) {
            return entityName.substr(0, 20).concat('...');
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

    return (
        <>
            <MainContainer onContextMenu={displayContextMenu}>
                <EntityContainer>
                    <EntityNameContainer>
                        <IconContainer>{parseIcon()}</IconContainer>
                        <EntityNameText>{parseName()}</EntityNameText>
                    </EntityNameContainer>
                    <EntityDetails>{ownerName}</EntityDetails>
                    <EntityDetails>{parseDateCreated()}</EntityDetails>
                    <EntityDetails>{parseLastModified()}</EntityDetails>
                </EntityContainer>
            </MainContainer>
            <ContextMenu id={MENU_ID} />
        </>
    );
};

export default NotebookEntity;
