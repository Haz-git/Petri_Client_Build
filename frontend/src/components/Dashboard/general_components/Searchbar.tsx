import React from 'react';
import styled from 'styled-components';

import { Search } from '@styled-icons/ionicons-solid/Search';

//Icons:
const SearchIcon = styled(Search)`
    color: #3c4042;
    height: 1.5rem;
    width: 1.5rem;
`;

//Styles:

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.75rem 0.75rem;
    background: #ececec;
    width: 100%;
    border-radius: 0.4em;
`;

const StyledSearchInput = styled.input`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 700;
    color: #3c4042;
    margin-left: 1rem;
    width: 100%;
    background: transparent;

    &::placeholder {
        color: #3c4042;
    }
`;

//Interface:

const Searchbar = () => {
    return (
        <MainContainer>
            <SearchIcon />
            <StyledSearchInput placeholder="Search" />
        </MainContainer>
    );
};

export default Searchbar;
