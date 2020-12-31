import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

//Styles:
const BlockDetailMain = styled.div`
    margin-top: 175px;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;

    @media only screen and (max-width: 650px) {
        display: block;
        margin-top: 100px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        display: block;
        margin-top: 100px;
    }
`
const BlockDetailImg = styled.div`
    display: inline-block;
`

const BlockDetailText = styled.div`
    display: inline-block;
`

const HeaderDecoration = styled.div`
    display: grid;
    align-items: center;
`

const BlockDetailHeader = styled.h2`
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

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 20px;
        padding: 8px 8px;
    }

`

const BlockDetailDesc = styled.p`
    margin-top: 20px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #F1F1E6;
    text-align: justify;
    padding-left: 45px;
    padding-right: 45px;

    @media only screen and (max-width: 650px) {
        font-size: 13px;
        padding-left: 35px;
        padding-right: 35px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        font-size: 13px;
        padding-left: 35px;
        padding-right: 35px;
    }
`


const ImgContainer = styled.div`

`

const StyledImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);

    @media only screen and (max-width: 600px) {
        margin-top: 20px;
    }

    @media only screen and (max-width: 850px) and (orientation: landscape) {
        margin-top: 20px;
    }
`

//Helper Functions:

const reverseComponent = (title, description, img) => {
    return (
        <>
            <BlockDetailImg>
                <ImgContainer>
                    <StyledImg src={img}></StyledImg>
                </ImgContainer>
            </BlockDetailImg>
            <BlockDetailText>
                <BlockDetailHeader>{title}</BlockDetailHeader>
                <BlockDetailDesc>{description}</BlockDetailDesc>
            </BlockDetailText>
        </>
    )
}

//Render:
const BodyBlock = ({Title, Description, Img, Reverse}) => {

    /*
        This is a very reusable component designed for displaying/advertising the app's features. The props are editable in the MainBackdrop. The 'Reverse' prop simple returns a version where the image and text are reversed. This is for aesthetic purposes.

        There is also an attached event listener to the window's viewwidth in order to make the website a bit more mobile friendly. If the viewWidth is less than 600, then the components will NOT be reversed because the display is no longer grid--it's block.
    */

    const [ viewWidth, setViewWidth ] = useState(0);
    const [ viewHeight, setViewHeight ] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', updateWindowSettings);

        return () => window.removeEventListener('resize', updateWindowSettings);
    }, [])

    const updateWindowSettings = () => {
        setViewHeight(window.innerHeight);
        setViewWidth(window.innerWidth);
    }

    if (Reverse === 'true') {
        if (viewWidth <= 860 && viewWidth !== 0 || window.innerWidth <= 860) {
            return (
                <Fade>
                    <BlockDetailMain>
                        <BlockDetailText>
                            <HeaderDecoration>
                                <BlockDetailHeader>{Title}</BlockDetailHeader>
                            </HeaderDecoration>
                            <BlockDetailDesc>{Description}</BlockDetailDesc>
                        </BlockDetailText>
                        <BlockDetailImg>
                            <ImgContainer>
                                <StyledImg src={Img}></StyledImg>
                            </ImgContainer>
                        </BlockDetailImg>
                    </BlockDetailMain>
                </Fade>
            )
        } else {
            return (
                <Fade>
                    <BlockDetailMain>
                        {reverseComponent(Title, Description, Img)}
                    </BlockDetailMain>
                </Fade>
            )
        }
    }

    return (
        <Fade>
            <BlockDetailMain>
                <BlockDetailText>
                    <HeaderDecoration>
                        <BlockDetailHeader>{Title}</BlockDetailHeader>
                    </HeaderDecoration>
                    <BlockDetailDesc>{Description}</BlockDetailDesc>
                </BlockDetailText>
                <BlockDetailImg>
                    <ImgContainer>
                        <StyledImg src={Img}></StyledImg>
                    </ImgContainer>
                </BlockDetailImg>
            </BlockDetailMain>
        </Fade>
    )
}

export default BodyBlock;