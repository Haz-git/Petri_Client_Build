import React, { useState } from 'react';

//Components:
import Searchbar from '../../general_components/Searchbar';

//Styles
import styled from 'styled-components';

const MainContainer = styled.div`
    position: relative;
`;

const DropdownContainer = styled.div`
    position: absolute;
    background: #ececec;
`;

const EntityItem = styled.div`
    z-index: 99;
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
    };

    const mapFilteredEntities = () => {
        if (sortedEntities.length !== 0 && searchbarInput !== '') {
            return sortedEntities.map((entity) => (
                <EntityItem
                    key={
                        entity.noteId === undefined
                            ? entity.folderId
                            : entity.noteId
                    }
                >
                    {entity.noteName === undefined
                        ? entity.folderName
                        : entity.noteName}
                </EntityItem>
            ));
        }
    };

    /* 
        0. Need a state to hold entities (blank on load)
        1. Function for sorting notebook entities based on searchbar Input (put a delay)
        2. Function for mapping the sorted entities
        3. Logic for clicking sorted entities (move to page programmatically)

    */

    return (
        <MainContainer>
            <Searchbar inputHandler={onSearchbarChange} />
            <DropdownContainer>{mapFilteredEntities()}</DropdownContainer>
        </MainContainer>
    );
};

export default NotebookSearchDropdown;
