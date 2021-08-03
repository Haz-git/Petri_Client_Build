import React from 'react';
import styled from 'styled-components';

//Styles:

const StyledSelect = styled.select``;

//Interfaces:

interface IComponentProps {
    optionEntities: any[];
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown = ({
    optionEntities,
    onChangeHandler,
}: IComponentProps): JSX.Element => {
    const renderOptions = () => {
        if (
            optionEntities !== undefined &&
            optionEntities !== null &&
            optionEntities.length !== 0
        ) {
            let modifiedOptionEntities = optionEntities;

            modifiedOptionEntities.unshift({
                folderName: 'Root',
                folderId: 'root',
            });

            console.log(modifiedOptionEntities);
            return modifiedOptionEntities.map((entity) => (
                <option key={entity.folderId} value={entity.folderId}>
                    {entity.folderName}
                </option>
            ));
        }
    };

    return (
        <>
            <StyledSelect
                onChange={onChangeHandler}
                defaultValue="Select a location"
            >
                <option key={'disabled'} value="Select a location" disabled>
                    Select a location
                </option>
                {renderOptions()}
            </StyledSelect>
        </>
    );
};

export default SelectDropdown;
