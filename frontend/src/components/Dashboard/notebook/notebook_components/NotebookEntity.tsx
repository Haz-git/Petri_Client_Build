import React from 'react';
import styled from 'styled-components';

//Styles:

const MainContainer = styled.div``;

//Interface:

interface MainNotebookProps {
    noteId?: string;
    noteName?: string;
    folderName?: string;
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
}: MainNotebookProps): JSX.Element => {
    return <div>Test Notebook Entity</div>;
};

export default NotebookEntity;
