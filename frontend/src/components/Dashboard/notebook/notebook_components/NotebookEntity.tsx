import React from 'react';
import styled from 'styled-components';

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
    noteName?: string;
    folderName?: string;
    folderId?: string;
    parentId?: string;
    ownerName?: string;
    dateCreated?: string;
    lastModified?: string;
}

const NotebookEntity = ({
    noteId,
    noteName,
    folderName,
    parentId,
    dateCreated,
    lastModified,
    ownerName,
}: MainNotebookProps): JSX.Element => {
    return (
        <MainContainer>
            <EntityContainer>
                <EntityNameContainer>
                    <IconContainer>
                        {noteId !== undefined ? (
                            <DocumentIcon />
                        ) : (
                            <FolderIcon />
                        )}
                    </IconContainer>
                    <EntityNameText>{noteName}</EntityNameText>
                </EntityNameContainer>
                <EntityDetails>{ownerName}</EntityDetails>
                <EntityDetails>{dateCreated}</EntityDetails>
                <EntityDetails>{lastModified}</EntityDetails>
            </EntityContainer>
        </MainContainer>
    );
};

export default NotebookEntity;