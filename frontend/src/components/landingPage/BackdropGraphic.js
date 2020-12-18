import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

//Styles:

const MainContainer = styled.div`
    margin-top: 20vh;
    position: relative;
    width: 600px;
    height: 525px;
    margin-left: 10px;
    border-radius: 15px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
    transform: perspective(500px) rotateY(-15deg);



`

const SideBarGraphic = styled.div`
    position: absolute;
    height: 525px;
    width: 600px;
    background-color: #293241;
    z-index: 1;
    border-radius: 15px;
`

const IconGraphics = styled.div`
    display: block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #588BAE;
    margin-left: 10px;
    margin-top: 12px;
    margin-bottom: 12px;
    z-index: 2;
`

const LogoGraphic = styled.div`
    display: block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #EB9605;
    margin-left: 10px;
    margin-top: 12px;
    margin-bottom: 30px;
    z-index: 2;
`

const BodyGraphic = styled.div`
    position: absolute;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 475px;
    width: 550px;
    top: 50px;
    left: 50px;
    background-color: #001B3A;
    z-index: 2;
`

const BodyDetailBox = styled.div`
    position: absolute;
    height: 200px;
    width: 150px;
    top: 25px;
    left: 25px;
    background-color: #1D2951;
    border-radius: 8px;
    z-index: 3;
`

const BodyDetailHeader = styled.div`
    position: absolute;
    height: 25px;
    width: 150px;
    background-color: #394867;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    z-index: 4;
`

const BodyDetailContents = styled.div`
    position: relative;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 15px;
    width: 120px;
    margin-left: 15px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`

const BodyDetailBox2 = styled.div`
    position: absolute;
    height: 200px;
    width: 330px;
    top: 25px;
    left: 200px;
    background-color: #1D2951;
    border-radius: 8px;
    z-index: 3;
`

const BodyDetailHeader2 = styled.div`
    position: absolute;
    height: 25px;
    width: 330px;
    background-color: #394867;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    z-index: 4;
`

const BodyDetailContents2 = styled.div`
    position: relative;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 15px;
    width: 120px;
    margin-left: 15px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`

const BodyDetailContents2MedBox = styled.div`
    position: relative;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 120px;
    width: 120px;
    margin-left: 15px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`

const BodyDetailContents2LargeBox = styled.div`
    position: absolute;
    margin-top: 7px;
    top: 33px;
    left: 130px;
    height: 142px;
    width: 175px;
    margin-left: 15px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`

const BodyDetailBox3 = styled.div`
    position: absolute;
    height: 200px;
    width: 505px;
    top: 240px;
    left: 25px;
    background-color: #1D2951;
    border-radius: 8px;
    z-index: 3;
`

const BodyDetailHeader3 = styled.div`
    position: absolute;
    height: 25px;
    width: 505px;
    background-color:  #394867;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    z-index: 4;
`

const BodyDetailContents3 = styled.div`
    position: relative;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 15px;
    width: 120px;
    margin-left: 15px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`

const BodyDetailContents3MedBox = styled.div`
    position: absolute;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 147px;
    width: 120px;
    left: 150px;
    background-color:#03506f;
    border-radius: 4px;
    z-index: 5;
`
const BodyDetailContents3MedBox2 = styled.div`
    position: absolute;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 147px;
    width: 120px;
    left: 280px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`
const BodyDetailContents3MedBox3 = styled.div`
    position: absolute;
    margin-top: 7px;
    display: block;
    top: 33px;
    height: 147px;
    width: 85px;
    left: 410px;
    background-color: #03506f;
    border-radius: 4px;
    z-index: 5;
`








//Render:

const BackdropGraphic = () => {
    return (
        <>
            <Fade right>
                <MainContainer>
                    <SideBarGraphic>
                        <LogoGraphic />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                        <IconGraphics />
                    </SideBarGraphic>
                    <BodyGraphic>
                        <BodyDetailBox>
                            <BodyDetailHeader />
                            <BodyDetailContents />
                            <BodyDetailContents />
                            <BodyDetailContents />
                            <BodyDetailContents />
                        </BodyDetailBox>
                        <BodyDetailBox2>
                            <BodyDetailHeader2 />
                            <BodyDetailContents2 />
                            <BodyDetailContents2MedBox />
                            <BodyDetailContents2LargeBox />
                        </BodyDetailBox2>
                        <BodyDetailBox3>
                            <BodyDetailHeader3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3 />
                            <BodyDetailContents3MedBox />
                            <BodyDetailContents3MedBox2 />
                            <BodyDetailContents3MedBox3 />
                        </BodyDetailBox3>
                    </BodyGraphic>
                </MainContainer>
            </Fade>
        </>
    )
}

export default BackdropGraphic;