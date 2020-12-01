import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteStrainFromCollection, addCollectionInputDataToStrain } from '../../../redux/userLacZ/LacZActions';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import TimePicker from 'react-time-picker';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

//Create a card with an input group--might have to add starting OD600 to the collection input card...

//Styles:

const CardMainContainer = styled.div`
margin-top: 10px;
margin-bottom: 10px;
`


const InputDivider = styled.div`
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
    text-align: center;
`

const StyledInputHeader = styled.h4`
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 600;
`

const StyledLabel = styled.label`
    font-family: 'Nunito', sans-serif;
    font-weight: 100;
    font-size: 17px;
    margin-right: 10px;
`

const StyledExistingCData = styled(StyledLabel)`
    font-size: 16px;
    font-weight: 800;
    margin-left: 0;
    margin-right: 0;
    margin-top: 10px;
    margin-bottom: 0px;
    padding: 5px 5px;

    @media (max-width: 1350px) {
        font-size: 12px;
    }

    @media (max-width: 1200px) {
        font-size: 8px;
    }

`

const BadgeDivider = styled.div`
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
`

const TimeInputDivider = styled.div`
    display: flex;
    height: 30px;
    align-items: baseline;
    margin-bottom: 10px;
`

const SpacerButton = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;

    @media (max-width: 1250px) {
        display: inline-grid;
    }
`
const DividerButton = styled.div`
    margin-left: 5px;
    margin-right: 5px;

    @media (max-width: 1250px) {
        margin-top: 5px;
        margin-bottom: 5px;
    }
`
const CollectionStrainCard = ({ name, pointNum, startTime, strainId, protocolId, deleteStrainFromCollection, addCollectionInputDataToStrain, collectionData, laczAssayProtocols }) => {

    let [ collectionValue, setCollectionValue ] = useState([]);

    const ownProtocol = laczAssayProtocols.find(item => item.protocolId === protocolId);
    const ownStrain = ownProtocol.collectionStrains.find(strain => strain.strainId === strainId);

    const renderExistingCollectionPoints = () => {
        if (ownStrain.hasOwnProperty('collectionData')) {
            return (
                <>
                    <Card.Subtitle className='mb-2 text-muted'>Existing Values for {(ownStrain.collectionData.length)}/{pointNum} Collection Points</Card.Subtitle>
                        {ownStrain.collectionData.map(item =>(
                            <BadgeDivider>
                                <Badge variant='light'>
                                    <StyledExistingCData>
                                        Collection: {item.collectionNum} |||
                                        OD600: {item.odValue} ||| 
                                        Time: {item.time}
                                    </StyledExistingCData>
                                </Badge>
                            </BadgeDivider>
                        ))}
                </>
            )
        } else {
            return (
                <Card.Subtitle className='mb-2 text-muted'>Add data for the {pointNum} collection points.</Card.Subtitle>
            )
        }
    }


    const handleOnChange = (object) => {

        const { name, value, number } = object;
        let collectionInputs = [...collectionValue];

        /*
            1. Destructures, name, value, and number out.
            2. Sets a variable to hold state array...
            3. loops through variable array, and finds the object with the correct collection number--
            if it DOESN'T find it, create a new object and insert.
            4. After finding the correct collection number and determining whether to replace a value or--
            create a new object, check the destructured 'name' value.
            5. Depending on the name value, place or replace the value accordingly...

        */

        const targetIndex = collectionInputs.findIndex(input => input.collectionNum === number);

        if (targetIndex === -1) {
            if (name === 'time' && value !== null) {
                let inputObjectTime = {
                    collectionNum: number,
                    time: value,
                    odValue: '',
                }

                collectionInputs.push(inputObjectTime);
                setCollectionValue(collectionInputs);
            }

            if(name === 'odValue' && value !== null) {
                let inputObjectOD = {
                    collectionNum: number,
                    time: '',
                    odValue: value,
                }

                collectionInputs.push(inputObjectOD);
                setCollectionValue(collectionInputs);
            }
        } else if (targetIndex > -1 && value !== null) {
            collectionInputs[targetIndex][name] = value;
            setCollectionValue(collectionInputs);
        }
    }


    const renderInputGroups = () => {
        const count = parseInt(pointNum) + 1
        let listNum = [];

        for (let i = 1; i < count; i++) {
            listNum.push(i);
        }

        return (
            listNum.map(number => (
                <InputDivider key={number}>
                    <StyledInputHeader>Collection: {number}</StyledInputHeader>
                    <TimeInputDivider>
                        <StyledLabel>Collected at: </StyledLabel>
                        <TimePicker
                            onChange={(time) => handleOnChange({name: 'time', value: time, number})}
                            disableClock={true}
                            format='h:m a'
                            key={number}
                            name='time'
                        />
                    </TimeInputDivider>
                    <InputGroup size='sm' className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm" >OD600</InputGroup.Text>
                            <FormControl 
                                aria-label="Small" 
                                aria-describedby="inputGroup-sizing-sm" 
                                type='number' 
                                key={number} 
                                name='odValue'
                                onChange={(e) => handleOnChange({ name:'odValue', value: e.target.value, number })} 
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                </InputDivider>
            ))
        )
    }

    const handleStrainDelete = () => {
        deleteStrainFromCollection(strainId, protocolId);
    }

    const handleSaveCollectionData = () => {
        addCollectionInputDataToStrain(strainId, protocolId, collectionValue);
    }


    return (
        <>
            <CardMainContainer>
                <Card key={strainId}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        {renderExistingCollectionPoints()}
                        <SpacerButton>
                            <DividerButton>
                                <Button variant="danger" size='sm'onClick={handleStrainDelete}>Delete</Button>
                            </DividerButton>
                            <DividerButton>
                                <Button variant="success"size='sm' onClick={handleSaveCollectionData}>Save</Button>
                            </DividerButton>
                            <DividerButton>
                                <Dropdown drop='right'>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" size='sm'>
                                        Add Collection Data
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {renderInputGroups()}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </DividerButton>
                        </SpacerButton>
                    </Card.Body>
                </Card>
            </CardMainContainer>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol
    }

}

export default connect(mapStateToProps, { deleteStrainFromCollection, addCollectionInputDataToStrain })(CollectionStrainCard);
