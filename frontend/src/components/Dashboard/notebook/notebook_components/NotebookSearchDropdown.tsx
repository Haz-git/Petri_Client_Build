import React from 'react';

//Components:
import Searchbar from '../../general_components/Searchbar';

//Styles
import styled from 'styled-components';

//Interface:

interface IComponentProps {
    notebookEntities: { rootFiles: any; rootFolders: any };
}

const NotebookSearchDropdown = ({
    notebookEntities,
}: IComponentProps): JSX.Element => {
    //Searchbar input handler:

    const onSearchbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    return (
        <>
            <Searchbar inputHandler={onSearchbarChange} />
        </>
    );
};

export default NotebookSearchDropdown;
