import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';
import CollectionStrains from './CollectionStrains';
import {v4 as uuid} from 'uuid';
import { addStrainToCollection } from '../../../redux/userLacZ/LacZActions';
import CollectionCharts from './CollectionCharts';
import { Link } from 'react-router-dom';


//Re-Chart:

//Styles:
import { MainHeader, SecondaryHeader, StyledLabel } from '../../signupPage/SignUpForm';
import { StyledInput } from './LazyLacZ';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BackspaceFill } from '@styled-icons/bootstrap/BackspaceFill';

const MainGridContainer = styled.div`
    display: grid;
    grid-template-columns: 37% 63%;
    padding: 20px 20px;
    column-gap: 10px;

    @media (min-width: 1800px) {
        grid-template-columns: 30% 70%;
    }

    @media (min-width: 2000px) {
        grid-template-columns: 27% 73%;
    }

    @media (min-width: 2200px) {
        grid-template-columns: 23% 77%;
    }

    @media (min-width: 2500px) {
        grid-template-columns: 20% 80%;
    }
    
`
const MainInputContainer = styled.div`
    display: block;
    max-width: 450px;
    justify-self: center;

    @media (min-width: 1600px) {
        max-width: 600px;
    }

    @media (max-width: 1350px) {
        max-width: 90%;
        justify-self: center;
    }
`

export const CollectionContainer = styled.div`
    background-color: white;
    border: 1px solid white;
    border-radius: 10px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
;
`

const ChartContainer = styled(CollectionContainer)`
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
    justify-self: stretch;


    @media (max-width: 1350px) {
        max-width: 100%;
        justify-self: center;
    }

    @media (min-width: 1600px) {
        max-width: 100%;
        justify-self: stretch
    }
`
const DetailInputContainer = styled.div`
    margin-top: 20px;
    display: block;
    text-align: center;
`
const StrainsContainer = styled.div`
    display: block;
    text-align: center;

`

const StyledReturnIcon = styled(BackspaceFill)`
    height: 22px;
    width: 22px;
    margin-right: 5px;
`

export const StyledMainHeader = styled(MainHeader)`
    font-size: 30px;
    margin: 0px;
    font-weight: 600;
    padding: 0;
`

const TimePickerDivider = styled.div`
    margin: 10px 10px;
`
const StyledLabelEdit = styled(StyledLabel)`
    margin: 0;
`

const StyledButton = styled(Button)`
    margin-left: 5px;
    margin-right: 5px;
`

const StrainInput = styled(StyledInput)`
    width: 100%;
    margin-top: 5px;
    height: 35px;
    padding-left: 10px;
`
//Render:

const Collection = ({ ownProtocol, addStrainToCollection }) => {


    const [ startTime, setStartTime ] = useState('');
    const [ collectionPoints, setCollectionPoints ] = useState('');
    const [ strainName, setStrainName ] = useState('');
    const [ startingOD, setStartingOD ] = useState('');

    //id == protocolId for mongoDB.
    const { protocolName, protocolId, timeStamp } = ownProtocol;

    const handleStartTimeChange = time => {
        setStartTime(time);
    }

    const handleCollectionPointChange = number => {
        setCollectionPoints(number.target.value);
    }

    const handleStrainNameChange = name => {
        setStrainName(name.target.value);
    }

    const handleStartingODChange = number => {
        setStartingOD(number.target.value);
    }

    const handleCollectionSubmit = e => {
        e.preventDefault();

        if (strainName !== '' && collectionPoints !== '' && startTime !== '') {
            const collectionsObject = {
                strainId: uuid(),
                strainName,
                collectionPoints,
                startTime,
                startingOD,
            }

            //send collectionsObject to action creator...
            addStrainToCollection(collectionsObject, protocolId);

        } else {
            return alert('Please input values for the fields before submission.')
        }

        setStartTime('');
        setCollectionPoints('');
        setStrainName('');
        setStartingOD('');
    }

    return (
        <>
            <MainGridContainer>
                <MainInputContainer>
                    <CollectionContainer>
                    <StyledMainHeader>Collection: {protocolName}</StyledMainHeader>
                        <DetailInputContainer>
                            <form onSubmit={handleCollectionSubmit}>
                                <div>
                                    <StyledLabelEdit>Start Time: </StyledLabelEdit>
                                    <TimePickerDivider>
                                        <TimePicker
                                            value={startTime}
                                            onChange={handleStartTimeChange}
                                            disableClock={true}
                                            format='h:m a'
                                        />
                                    </TimePickerDivider>
                                </div>
                                <div>
                                    <StyledLabelEdit>Starting OD600</StyledLabelEdit>
                                    <StrainInput
                                        onChange={handleStartingODChange}
                                        value={startingOD}
                                        type='number'
                                    />
                                </div>
                                <div>
                                    <StyledLabelEdit>Collection Points (Per Strain):</StyledLabelEdit>
                                    <Form.Control
                                        as="select"
                                        className="my-1 mr-sm-2"
                                        id="inlineFormCustomSelectPref"
                                        custom
                                        onChange={handleCollectionPointChange}
                                        value={collectionPoints}
                                    >
                                        <option value="0">Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                        <option value="6">Six</option>
                                        <option value="7">Seven</option>
                                        <option value="8">Eight</option>
                                    </Form.Control>
                                </div>
                                <div>
                                    <StyledLabelEdit>Strain Name:</StyledLabelEdit>
                                    <StrainInput
                                        onChange={handleStrainNameChange}
                                        value={strainName}
                                    />
                                </div>
                                <div>
                                    <Link to='/scitools/lazylacz'>
                                        <StyledButton variant='secondary'>
                                            <StyledReturnIcon />
                                            Return
                                        </StyledButton>
                                    </Link>
                                    <StyledButton variant="primary" type='submit'>
                                        Submit
                                    </StyledButton>
                                    <StyledButton variant="warning" type='reset'>
                                        Reset
                                    </StyledButton>
                                </div>
                            </form>
                        </DetailInputContainer>
                    </CollectionContainer>
                    <StrainsContainer>
                        <CollectionStrains ownProtocolId={protocolId} />
                    </StrainsContainer>
                </MainInputContainer>
                <ChartContainer>
                    <CollectionCharts ownProtocolId={protocolId} />
                </ChartContainer>
            </MainGridContainer>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const ownProtocolId = ownProps.match.params.id;
    const ownProtocol = state.laczAssayProtocols.laczProtocol.find(item => item.protocolId === ownProtocolId);


    return {
        ownProtocol,
    }

}

export default connect(mapStateToProps, { addStrainToCollection })(Collection);
