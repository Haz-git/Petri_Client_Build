import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

//Styles:
const MainContainer = styled.div`
    margin-top: 100px;
    text-align: center;
    margin-bottom: 100px;
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

    @media only screen and (max-width: 650px) {
        font-size: 20px;
        padding: 8px 8px;
    }


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

    @media only screen and (max-width: 650px) {
        font-size: 13px;
        padding-left: 35px;
        padding-right: 35px;
        text-align: center;
    }

`
const ImageContainer = styled.div`
    display: flex;
    height: 760px;
    width: 100%;
    justify-content: center;

    @media only screen and (max-width: 650px) {
        display: block;
        text-align: center;
    }

`
const StyledImgFirst = styled.img`
    /* top: 0;
    left: 180px;
    position: absolute; */
    margin: 15px 15px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 7px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, .60);

    @media only screen and (max-width: 650px) {
        margin: 0;
    }
`

const ImageSeparator = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin: 0 auto; */
`

const StyledImgSecond = styled.img`
    /* top: 0;
    right: 180px;
    position: absolute; */
    margin: 15px 15px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 7px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, .60);

    @media only screen and (max-width: 650px) {
        margin-top: 13px;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
    }
`

const StyledImgThird = styled.img`
    /* bottom: 10px;
    right: 180px;
    position: absolute; */
    margin: 15px 15px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 7px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, .60);

    @media only screen and (max-width: 650px) {
        margin: 13px 0;
    }
`


//Render:

/*
    Unfortunately, not a very reusable component because of the use-case. Three separately sized images were needed to fit together in a specific format. To achieve this, CSS was used specifically. However, the working parts: Title, Description, etc. are all props editable in the mainBackdrop.
*/

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
                    <ImageSeparator>
                        <StyledImgSecond src={secondImg} />
                        <StyledImgThird src={thirdImg} />
                    </ImageSeparator>
                </ImageContainer>
            </MainContainer>
        </Fade>
    )
}

export default BodyBlockSpread;