import React, { useState } from 'react';
import { connect } from 'react-redux';
import LacZCards from './LacZCards';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Styles:
import { MainHeader, SecondaryHeader } from '../../signupPage/SignUpForm';
import { Button } from 'react-bootstrap';
import { ArrowLeftSquare } from '@styled-icons/bootstrap/ArrowLeftSquare';
import { Graph } from '@styled-icons/octicons/Graph';


const StyledMainHeader = styled(MainHeader)`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    font-family: 'Nunito', Arial, Helvetica, sans-serif;
    color: ${props => props.theme.lacZMainHeaderC};
    font-weight: 400;
    margin-bottom: 20px;
`

const LacZMainContainer = styled.div`
    padding: 20px 20px;
    text-align: center;
    background-color: ${props => props.theme.lacZMainContainerBG};
    height: 100vh;
    overflow-y: scroll;
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
    vertical-align: sub;
`

const GraphIcon = styled(Graph)`
    height: 21px;
    width: 21px;
    margin-right: 7px;
    vertical-align: sub;
`


//Render:

const LacZ = ({ laczAssayProtocols, match:{params:{id}} }) => {

    const ownProtocol = laczAssayProtocols.find(x => x.protocolId === id);

    const renderLacZCards = () => {
        if (ownProtocol.collectionStrains !== null && ownProtocol.collectionStrains !== undefined) {
            return ownProtocol.collectionStrains.map(strain => (
                <LacZCards
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
                    <Link to={`/scitools/lazylacz/lacz/compare/${id}`}>
                        <Button variant='primary'>
                            <GraphIcon />
                            Compare B-Gal Activities
                        </Button>
                    </Link>
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
