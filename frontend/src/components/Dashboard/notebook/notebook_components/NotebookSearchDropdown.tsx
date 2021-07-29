import React, { useState } from 'react';

//Components:
import { Link } from 'react-router-dom';
import Searchbar from '../../general_components/Searchbar';
import OutsideClickHandler from 'react-outside-click-handler';

//Styles
import styled from 'styled-components';

//icons:
import { FileEarmarkText } from '@styled-icons/bootstrap/FileEarmarkText';
import { Folder2 } from '@styled-icons/bootstrap/Folder2';

const DocumentIcon = styled(FileEarmarkText)`
    color: #423c3c;
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
`;

const FolderIcon = styled(Folder2)`
    color: #423c3c;
    height: 1.05rem;
    width: 1.05rem;
    margin-right: 0.5rem;
`;

const MainContainer = styled.div`
    width: 100%;
    position: relative;
`;

const DropdownContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
`;

const EntityItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 99;
    background: #ffffff;
    width: 100%;
    border-bottom: 1px solid #ececec;
    padding: 0.5rem 0.5rem;

    &:hover {
        text-decoration: none;
        background: #ececec;
    }

    &:focus {
        text-decoration: none;
    }
`;

const EntityNameText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 400;
    color: #3c4042;
    padding-bottom: 0.05rem;
`;

//Interface:

interface IComponentProps {
    notebookEntities: { rootFiles: any; rootFolders: any };
}

const NotebookSearchDropdown = ({
    notebookEntities,
}: IComponentProps): JSX.Element => {
    //Sorted entity state:
    const [sortedEntities, setSortedEntities] = useState<any[]>([]);

    //Searchbar input state:
    const [searchbarInput, setSearchbarInput] = useState('');

    //Searchbar input handler:
    const onSearchbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (notebookEntities !== undefined && notebookEntities !== null) {
            setSearchbarInput(e.target.value);
            if (e.target.value !== '') {
                let totalEntities = notebookEntities.rootFolders.concat(
                    notebookEntities.rootFiles
                );

                let filteredEntities = totalEntities.filter((entity) => {
                    let entityType =
                        entity.noteName === undefined ? 'FOLDER' : 'NOTE';

                    if (entityType !== 'NOTE') {
                        return entity.folderName
                            .trim()
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase());
                    } else {
                        return entity.noteName
                            .trim()
                            .toLowerCase()
                            .includes(e.target.value.trim().toLowerCase());
                    }
                });

                setSortedEntities(filteredEntities);
            }
        }
    };

    const mapFilteredEntities = () => {
        if (sortedEntities.length !== 0 && searchbarInput !== '') {
            return sortedEntities.map((entity) => {
                const entityId =
                    entity.noteId === undefined
                        ? entity.folderId
                        : entity.noteId;
                const entityType =
                    entity.noteId === undefined ? 'FOLDER' : 'NOTE';
                const entityName =
                    entity.noteId === undefined
                        ? entity.folderName
                        : entity.noteName;
                if (entityType === 'NOTE') {
                    return (
                        <EntityItem
                            to={`/notebook/note/${entityId}`}
                            key={entityId}
                        >
                            <DocumentIcon />
                            <EntityNameText>{entityName}</EntityNameText>
                        </EntityItem>
                    );
                } else if (entityType === 'FOLDER') {
                    return (
                        <EntityItem to={`/notebook/${entityId}`} key={entityId}>
                            <FolderIcon />
                            <EntityNameText>{entityName}</EntityNameText>
                        </EntityItem>
                    );
                } else {
                    return <>An error occurred. </>;
                }
            });
        }

        return null;
    };

    /* 
        0. Need a state to hold entities (blank on load)
        1. Function for sorting notebook entities based on searchbar Input (put a delay)
        2. Function for mapping the sorted entities
        3. Logic for clicking sorted entities (move to page programmatically)

    */

    return (
        <OutsideClickHandler onOutsideClick={() => setSortedEntities([])}>
            <MainContainer>
                <Searchbar inputHandler={onSearchbarChange} />
                <DropdownContainer>{mapFilteredEntities()}</DropdownContainer>
            </MainContainer>
        </OutsideClickHandler>
    );
};

export default NotebookSearchDropdown;
