import React from 'react';
import styled from 'styled-components';

//Styles:

const StyledSelect = styled.select``;

//Interfaces:

interface IComponentProps {
    optionEntities: [];
}

const SelectDropdown = ({ optionEntities }: IComponentProps): JSX.Element => {
    return (
        <>
            <StyledSelect>
                <option>Test</option>
            </StyledSelect>
        </>
    );
};

export default SelectDropdown;
