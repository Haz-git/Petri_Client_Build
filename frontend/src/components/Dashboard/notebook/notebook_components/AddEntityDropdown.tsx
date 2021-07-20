import React, { useState } from 'react';
import styled from 'styled-components';

//Components:
import GeneralButton from '../../general_components/GeneralButton';
import OutsideClickHandler from 'react-outside-click-handler';

//Styles:
import { Add } from '@styled-icons/material/Add';

const AddIcon = styled(Add)`
    color: #ffffff;
    height: 1.5rem;
    width: 1.5rem;
`;

const MainContainer = styled.div`
    position: relative;
`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #ffffff;
    z-index: 99 !important;
    border: 1px solid black;
    border-radius: 0.4rem;
    padding: 1rem 1rem;
    visibility: ${(props) => props.isVisible};
`;

//Interfaces:

const AddEntityDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <MainContainer>
            <GeneralButton
                buttonLabel="Add New"
                buttonIcon={<AddIcon />}
                fontSize="1.2em"
                onClick={toggleDropdown}
            />
            <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
                <DropdownContainer
                    isVisible={showDropdown === true ? 'visible' : 'hidden'}
                >
                    Test
                </DropdownContainer>
            </OutsideClickHandler>
        </MainContainer>
    );
};

export default AddEntityDropdown;
