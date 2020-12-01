import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import { v4 as uuid } from 'uuid';
import { addlacZDataToStrain } from '../../../redux/userLacZ/LacZActions';
import LacZChart from './LacZChart';

//Styles:
const MainCardContainer = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    margin-top: 30px;
    background-color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 10px;
    text-align: center;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 5px rgba(0, 0, 0, 0.06),
        0 22.3px 10px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 80px rgba(0, 0, 0, 0.12);
    ;
`

const MainInputContainer = styled.div`
    padding: 10px 10px;
    background-color: #242746;
    border: none;
    border-radius: 5px;
`

const InputHeader = styled.h2`
    font-family: 'Nunito', sans-serif, Arial, Helvetica;
    font-weight: 500;
    font-size: 30px;
    color: white;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 10px;
`
const ButtonDivider = styled.div`
    margin-left: 5px;
    margin-right: 5px;
`
const BadgeDivider = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`

const InputGroupContainer = styled.div`
    text-align: center;
    padding: 10px 10px;
    width: 270px;
`

const InputGroupHeaderContainer = styled.div`
    text-align: center;
`

const StyledExistingCData = styled.div`
    color: #242746;
`

const MainChartRenderingContainer = styled.div`
    background-color: white;
`


//Render:
const LacZCards = ({
    minute,
    dilutionFactor,
    volume,
    ownProtocolId,
    ownStrainId,
    ownStrainName,
    collectionData,
    addlacZDataToStrain,
    laczAssayProtocols,
}) => {

    const [lacZValue, setLacZValue] = useState([]);

    const ownProtocol = laczAssayProtocols.find(item => item.protocolId === ownProtocolId)
    const ownStrain = ownProtocol.collectionStrains.find(strain => strain.strainId === ownStrainId);


    const renderInputGroups = () => {

        return collectionData.map((collection, index) => (
            <>
                <InputGroupContainer>
                    <InputGroupHeaderContainer>
                        <h4>Collection {collection.collectionNum} </h4>
                        <label>Collected OD600: {collection.odValue} </label>
                    </InputGroupHeaderContainer>
                    <InputGroup size='sm' className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm" >OD420</InputGroup.Text>
                            <FormControl 
                                aria-label="Small" 
                                aria-describedby="inputGroup-sizing-sm" 
                                type='number' 
                                name='odValue420'
                                onChange={(e) => handleOnChange({ name:'odValue420', value: e.target.value, number: index + 1})} 
                            />
                        </InputGroup.Prepend>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm" >OD550</InputGroup.Text>
                            <FormControl 
                                aria-label="Small" 
                                aria-describedby="inputGroup-sizing-sm" 
                                type='number' 
                                name='odValue550'
                                onChange={(e) => handleOnChange({ name:'odValue550', value: e.target.value, number: index + 1 })} 
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                </InputGroupContainer>
            </>
        ))
    }

    const handleOnChange = object => {
        const { name, value, number } = object;
        let lacZInputs = [...lacZValue];

        const targetIndex = lacZInputs.findIndex(input => input.collectionNum === number);

        if (targetIndex === -1) {
            if(name === 'odValue420' && value !== null) {
                let inputObjectOD420 = {
                    collectionNum: number,
                    odValue420: value,
                }
            
            lacZInputs.push(inputObjectOD420);
            setLacZValue(lacZInputs);

            }

            if(name === 'odValue550' && value !== null) {
                let inputObjectOD550 = {
                    collectionNum: number,
                    odValue550: value,
                }

                lacZInputs.push(inputObjectOD550);
                setLacZValue(lacZInputs);
            }
        } else if (targetIndex > -1 && value !== null) {
            lacZInputs[targetIndex][name] = value;
            setLacZValue(lacZInputs);
        }
    }

    const handleSaveCollectionData = () => {
        addlacZDataToStrain(ownStrainId, ownProtocolId, lacZValue);
    }

    const renderExistingLacZData = () => {
        if (ownStrain.lacZData !== null && ownStrain.lacZData !== undefined) {
            return (
                <>
                    <Card.Subtitle className='mb-2 text-white'>Existing Lac-Z Values for {(ownStrain.lacZData.length)}/{collectionData.length} Collection Points</Card.Subtitle>
                        {ownStrain.lacZData.map(item =>(
                            <BadgeDivider>
                                <Badge variant='light'>
                                    <StyledExistingCData>
                                        Collection: {item.collectionNum} |||
                                        OD420: {item.odValue420} ||| 
                                        OD550: {item.odValue550}
                                    </StyledExistingCData>
                                </Badge>
                            </BadgeDivider>
                        ))}
                </>
            )
        } else {
            return (
                <Card.Subtitle className='mb-2 text-white'>Add Lac-Z data for the {ownStrain.collectionData.length} collection points.</Card.Subtitle>
            )
        }
    }

    const renderCharts = () => {

        if (ownStrain.lacZData !== null && ownStrain.lacZData !== undefined) {
            return (
                <>
                    <LacZChart
                        ownStrain={ownStrain}
                        minute={minute}
                        dilutionFactor={dilutionFactor}
                        volume={volume}
                    />
                </>
            )
        } else {
            return (
                <>
                    Please add Lac-Z Data
                </>
            )
        }
    }

    return (
        <MainCardContainer>
            <MainInputContainer>
                <InputHeader>{ownStrainName}</InputHeader>
                <div>
                    {renderExistingLacZData()}
                </div>
                <ButtonContainer>
                    <ButtonDivider>
                        <Button variant="success" size='sm' onClick={handleSaveCollectionData}>Save and Render</Button>
                    </ButtonDivider>
                    <ButtonDivider>
                        <Dropdown drop='right'>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" size='sm'>
                                Add Lac-Z Data
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {renderInputGroups()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonDivider>
                </ButtonContainer>
            </MainInputContainer>
            <MainChartRenderingContainer>
                {renderCharts()}
            </MainChartRenderingContainer>
        </MainCardContainer>
    )
}

const mapStateToProps = state => {
    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol,
    }
}

export default connect(mapStateToProps, { addlacZDataToStrain })(LacZCards);
