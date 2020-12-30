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
    width: 100%;
    background: linear-gradient(180deg, rgba(20,22,40,1) 40%, rgba(23,24,45,1) 75%, rgba(34,35,65,1) 94%);
    min-height: 500px;
    align-items: flex-start;

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

    @media (max-height: 700px) {
        height: 700px;
    }

    @media (max-height: 600px) {
        height: 600px;
    }

    @media (max-height: 500px) {
        height: 500px;
    }

    overflow-x: hidden;
    overflow-y: hidden;

`
const WrapperContainer = styled.div`
    display: flex;
    align-items: center;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        display: block;
        overflow: hidden;
    }
`

const HeaderContainer = styled.div`
    margin-top: 15vh;
    padding: 0 40px;

    @media only screen and (max-width: 650px) and (orientation: portrait) {
        padding: 0 10px;
        margin-top: 8vh;
    }
`

const GraphicContainer = styled.div`

`

const MainBackDropHeader = styled.h1`
    margin: 20px 0;
    font-family: 'Pattaya', 'Nunito', sans-serif, helvetica;
    font-weight: 400;
    color: white;
    font-size: 65px;

    @media only screen and (max-width: 650px) {
        font-size: 35px;
        margin: 0;
    }

    /* @media only screen and (min-width: 600px) {
        font-size: 10px;
    } */
`

const SecondaryHeader = styled.h2`
    margin: 0;
    font-family: 'Open Sans', 'Nunito', sans-serif, helvetica;
    font-weight: 400;
    color: white;
    font-size: 22px;
    padding-top: 5px;
    padding-bottom: 5px;

    @media only screen and (max-width: 650px) {
        font-size: 11px;
    }

    /* @media only screen and (min-width: 600px) {
        font-size: 10px;
    } */
`

const StyledCreateIcon = styled(Create)`
    height: 32px;
    width: 32px;

    @media only screen and (max-width: 650px) {
        height: 22px;
        width: 22px;
    }
`
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      marginTop: '30px',
      [theme.breakpoints.down('md')]: {
        height: '40px',
        width: '185px',
        fontSize: '10px',
        marginTop: '10px',
        marginBottom: '30px',

      },
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
        //This component is the backdrop image, text, and color the user should see on visit to the landing page.
        <>
            <StyledBackdrop>
                    <HeaderContainer>
                        <WrapperContainer>
                            <div>
                                <Fade top>
                                    <MainBackDropHeader>Petri</MainBackDropHeader>
                                </Fade>
                                <Fade bottom>
                                    <SecondaryHeader>The ultimate utility tool for optimizing your research workflow.</SecondaryHeader>
                                    <SecondaryHeader>Focus on your research. We'll make it easy to stay on track.</SecondaryHeader>
                                </Fade>
                                <Fade>
                                    <StyledLink to='/signup'>
                                        <ColorButton
                                            style={{
                                                // width: '250px',
                                                // height: '60px',
                                                // marginTop: '30px',
                                            }}
                                            variant='contained'
                                            size='large'
                                            startIcon={<StyledCreateIcon />}
                                        >
                                            Register for free
                                        </ColorButton>
                                    </StyledLink>
                                </Fade>
                            </div>
                            <GraphicContainer>
                                <BackdropGraphic />
                            </GraphicContainer>
                        </WrapperContainer>
                    </HeaderContainer>
                <LearnMoreDivider>
                    <LearnMoreArrow />
                </LearnMoreDivider>
            </StyledBackdrop>
        </>
    )
}

export default Mainbackdrop;