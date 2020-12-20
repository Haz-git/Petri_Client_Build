import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import BackdropGraphic from './BackdropGraphic';
import Fade from 'react-reveal/Fade';
import LearnMoreArrow from './LearnMoreArrow';



//Styles:
import { Create } from '@styled-icons/ionicons-outline/Create';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const StyledBackdrop = styled.div`
    display: flex;
    justify-content: center;
    padding: 30px 30px;
    background: linear-gradient(180deg, rgba(20,22,40,1) 40%, rgba(23,24,45,1) 75%, rgba(34,35,65,1) 94%);
    min-height: 550px;

    @media (min-height: 1350px) {
        height: 100vh;
    }

    @media (max-height: 1350px) {
        height: 1350px;
    }

    @media (max-height: 1000px) {
        height: 1000px;
    }

    @media (max-height: 900px) {
        height: 900px;
    }

    @media (max-height: 800px) {
        height: 800px;
    }

    overflow-x: hidden;

`

const HeaderContainer = styled.div`
    margin-top: 20vh;
    padding: 0 40px;
`

const MainBackDropHeader = styled.h1`
    margin: 20px 0;
    font-family: 'Pattaya', 'Nunito', sans-serif, helvetica;
    font-weight: 400;
    color: white;
    font-size: 65px;
`

const SecondaryHeader = styled.h2`
    margin: 0;
    font-family: 'Open Sans', 'Nunito', sans-serif, helvetica;
    font-weight: 400;
    color: white;
    font-size: 22px;
    padding-top: 5px;
    padding-bottom: 5px;
`

const StyledCreateIcon = styled(Create)`
    height: 32px;
    width: 32px;
`
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
}))(Button);

const StyledLink = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`

const LearnMoreDivider = styled.div`
    position: absolute;
    bottom: 20px;
`


//Render:

const Mainbackdrop = () => {
    return (
        <>
            <StyledBackdrop>
                <HeaderContainer>
                    <Fade top>
                        <MainBackDropHeader>Petri</MainBackDropHeader>
                    </Fade>
                    <Fade bottom>
                        <SecondaryHeader>The ultimate utility tool for optimizing your research workflow.</SecondaryHeader>
                        <SecondaryHeader>Focus on your research. We'll do the organization.</SecondaryHeader>
                    </Fade>
                    <Fade>
                        <StyledLink to='/signup'>
                            <ColorButton
                                style={{
                                    width: '250px',
                                    height: '60px',
                                    marginTop: '30px',
                                }}
                                variant='contained'
                                size='large'
                                startIcon={<StyledCreateIcon />}
                            >
                                Register for free
                            </ColorButton>
                        </StyledLink>
                    </Fade>
                </HeaderContainer>
                <div>
                    <BackdropGraphic />
                </div>
                <LearnMoreDivider>
                    <LearnMoreArrow />
                </LearnMoreDivider>
            </StyledBackdrop>
        </>
    )
}

export default Mainbackdrop;