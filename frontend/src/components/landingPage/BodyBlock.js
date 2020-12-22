import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

//Styles:
const BlockDetailMain = styled.div`
    margin-top: 175px;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
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
`


const ImgContainer = styled.div`

`

const StyledImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
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

    if (Reverse === 'true') {
        return (
            <Fade>
                <BlockDetailMain>
                    {reverseComponent(Title, Description, Img)}
                </BlockDetailMain>
            </Fade>
        )
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