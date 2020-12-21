import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

//Styles:
const MainContainer = styled.div`
    margin-top: 100px;
    text-align: center;
`

const MainDescContainer = styled.div`

`

const MainHeader = styled.h1`
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 33px;
    font-weight: 100;
    color: #fcf6dc;
    background-color: #158582;
    padding: 15px 15px;
    width: fit-content;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0,0.12), 0 1px 2px rgba(0,0,0.24);
`
const MainDesc = styled.p`
    margin-top: 20px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #F1F1E6;
    text-align: center;
    padding-left: 45px;
    padding-right: 45px;
    margin-bottom: 30px;
`
const ImageContainer = styled.div`
    position: relative;
    height: 760px;
    width: 100%;
`
const StyledImgFirst = styled.img`
    top: 0;
    left: 180px;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
`

const StyledImgSecond = styled.img`
    top: 0;
    right: 180px;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
`

const StyledImgThird = styled.img`
    bottom: 10px;
    right: 180px;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
`


//Render:

const BodyBlockSpread = ({ Title, Description, firstImg, secondImg, thirdImg }) => {
    return (
        <Fade>
            <MainContainer>
                <MainDescContainer>
                    <MainHeader>{Title}</MainHeader>
                    <MainDesc>{Description}</MainDesc>
                </MainDescContainer>
                <ImageContainer>
                    <StyledImgFirst src={firstImg} />
                    <StyledImgSecond src={secondImg} />
                    <StyledImgThird src={thirdImg} />
                </ImageContainer>
            </MainContainer>
        </Fade>
    )
}

export default BodyBlockSpread;