import React, { useState } from 'react';
import styled from 'styled-components';

import { Search } from '@styled-icons/ionicons-solid/Search';
import OutsideClickHandler from 'react-outside-click-handler';

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
    background: ${({ isActive }) =>
        isActive === false ? '#ececec' : '#f9f9f9'};
    width: 100%;
    border-radius: 0.4em;
    border: ${({ isActive }) =>
        isActive === false ? '1px solid #ececec' : '1px solid #4263eb'};

    box-shadow: ${({ isActive }) =>
        isActive === false ? 'none' : 'rgba(0, 0, 0, 0.2) 0px 2px 4px'};
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
    const [isActive, setIsActive] = useState(false);

    const toggleIsActive = () => setIsActive(true);

    return (
        <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
            <MainContainer onClick={toggleIsActive} isActive={isActive}>
                <SearchIcon />
                <StyledSearchInput placeholder="Search" isActive={isActive} />
            </MainContainer>
        </OutsideClickHandler>
    );
};

export default Searchbar;
