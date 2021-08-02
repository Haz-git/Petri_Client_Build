import React from 'react';
import styled from 'styled-components';

//Styles:

const StyledSelect = styled.select``;

//Interfaces:

interface IComponentProps {
    optionEntities: any[];
}

const SelectDropdown = ({ optionEntities }: IComponentProps): JSX.Element => {
    const renderOptions = () => {
        if (
            optionEntities !== undefined &&
            optionEntities !== null &&
            optionEntities.length !== 0
        ) {
            return optionEntities.map((entity) => (
                <option>{entity.folderName}</option>
            ));
        }
    };

    return (
        <>
            <StyledSelect>{renderOptions()}</StyledSelect>
        </>
    );
};

export default SelectDropdown;
