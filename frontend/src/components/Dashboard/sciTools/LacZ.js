import React, { useState } from 'react';
import { connect } from 'react-redux';
import LacZCards from './LacZCards';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Styles:
import { MainHeader, SecondaryHeader } from '../../signupPage/SignUpForm';
import { Button } from 'react-bootstrap';
import { ArrowLeftSquare } from '@styled-icons/bootstrap/ArrowLeftSquare';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Cogs } from '@styled-icons/fa-solid/Cogs';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const StyledMainHeader = styled(MainHeader)`
    margin: 0;
`

const LacZMainContainer = styled.div`
    padding: 20px 20px;
    text-align: center;
`

const HeaderContainer = styled.div`
    text-align: center;
`

const ReturnButtonContainer = styled.div`
    display: flex;
`

const ArrowIcon = styled(ArrowLeftSquare)`
    height: 21px;
    width: 21px;
    margin-right: 7px;
`

const StyledCogs = styled(Cogs)`
    height: 21px;
    width: 21px;
    margin-right: 7px;
`
const AccordionContainer = styled.div`
    display: flex;
    justify-content: center;
`

//Render:

const LacZ = ({ laczAssayProtocols, match:{params:{id}} }) => {

    const ownProtocol = laczAssayProtocols.find(x => x.protocolId === id);

    const [ volume, setVolume ] = useState(0.05);
    const [ dilution, setDilution ] = useState(5);
    const [ minutes, setMinutes ] = useState(1.3333);

    const renderLacZCards = () => {
        if (ownProtocol.collectionStrains !== null && ownProtocol.collectionStrains !== undefined) {
            return ownProtocol.collectionStrains.map(strain => (
                <LacZCards
                    minute={minutes}
                    dilutionFactor={dilution}
                    volume={volume}
                    ownProtocolId={ownProtocol.protocolId}
                    ownStrainId={strain.strainId}
                    ownStrainName={strain.strainName}
                    collectionData={strain.collectionData}
                />
            ))
        } else {
            return (
                <>
                    <SecondaryHeader>
                        Sorry! You haven't collected any strains yet. Try to do that before running the LacZ assay. It's the first step, after all.
                    </SecondaryHeader>
                    <Link to={`/scitools/lazylacz/collection/${id}`}>
                        <Button variant='primary' size='lg'>Navigate To Collection Area</Button>
                    </Link>
                </>
            )
        }
    }

    const handleOnVolumeChange = e => {
        setVolume(e.target.value);
    }

    const handleOnDilutionChange = e => {
        setDilution(e.target.value);
    }

    const handleOnMinutesChange = e => {
        setMinutes(e.target.value);
    }

    // const handleSettingsSubmit = () => {

    // }


    return (
        <LacZMainContainer>
            <HeaderContainer>
                <ReturnButtonContainer>
                    <Link to='/scitools/lazylacz'>
                        <Button variant='dark'>
                            <ArrowIcon />
                            My Protocols
                        </Button>
                    </Link>
                </ReturnButtonContainer>
                <StyledMainHeader>LacZ Data Collection</StyledMainHeader>
                <AccordionContainer>
                    <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant='dark' eventKey='0'>
                                        <StyledCogs />
                                        Configure
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey='0'>
                                    <Card.Body>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Volume</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                            placeholder="0.05"
                                            aria-label="Volume"
                                            aria-describedby="basic-addon1"
                                            type='number'
                                            onChange={handleOnVolumeChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Dilution Factor</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                            placeholder="5"
                                            aria-label="Dilution Factor"
                                            aria-describedby="basic-addon1"
                                            type='number'
                                            onChange={handleOnDilutionChange}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Minutes Taken</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                            placeholder="1.3333"
                                            aria-label="Minutes Taken"
                                            aria-describedby="basic-addon1"
                                            type='number'
                                            onChange={handleOnMinutesChange}
                                            />
                                        </InputGroup>
                                        {/* <Button variant='primary' onClick={handleSettingsSubmit}>
                                            Submit
                                        </Button> */}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </AccordionContainer>
            </HeaderContainer>
            <div>
                {renderLacZCards()}
            </div>
        </LacZMainContainer>
    )
}

const mapStateToProps = state => {
    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol,
    }
}

export default connect(mapStateToProps)(LacZ);
