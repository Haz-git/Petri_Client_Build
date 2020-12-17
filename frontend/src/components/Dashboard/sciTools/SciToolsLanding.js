import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

import galactPhoto from '../../../Img/bgalact.png';

//Styles:
import { SecondaryHeader } from '../../signupPage/SignUpForm';
import Fade from 'react-reveal/Fade';

const MainContainer = styled.div`
    height: 100vh;
    text-align: center;
    background-color: ${props => props.theme.landingPageBGColor};
`

const MainSciToolsHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: ${props => props.theme.settingsHeaderBG};
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    ;
`

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: ${props => props.theme.settingsMainHeaderTextC};
`

const SciToolsSecondaryHeader = styled(SecondaryHeader)`
    margin: 0;
    font-size: 30px;
    font-weight: 300;
    color: ${props => props.theme.landingPageSecondaryHeader};
`
const MainProgramContainer = styled.div`
    margin: 20px 20px;
    display: flex;
    justify-content: center;
`
const SubProgramContainer = styled.div`
    
`
const ProgramLink = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`
const StyledCard = styled(Card)`
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    ;
    transition: all .3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`


const SciToolsLanding = () => {
    return (
        <>
            <MainContainer>
                <MainSciToolsHeaderContainer>
                    <Fade>
                        <StyledMainHeader>Your Sci-Tools</StyledMainHeader>
                    </Fade>
                </MainSciToolsHeaderContainer>
                <SciToolsSecondaryHeader>Please choose a program below</SciToolsSecondaryHeader>
                <MainProgramContainer>
                    <SubProgramContainer>
                        <ProgramLink to='/scitools/lazylacz'>
                            <StyledCard bg='dark' text='light' style={{ width: '15rem' }}>
                                <Card.Img variant="top" src={galactPhoto} style={{ width: '100%', height: '200px' }}/>
                                <Card.Body>
                                    <Card.Title bg='dark'>Lazy Lac-Z</Card.Title>
                                    <Card.Text>
                                        Otherwise known as the Beta-Galactosidase Assay.
                                    </Card.Text>
                                </Card.Body>
                            </StyledCard>
                        </ProgramLink>
                    </SubProgramContainer>
                </MainProgramContainer>
            </MainContainer>
        </>
    )
}

export default SciToolsLanding;