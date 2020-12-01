import React from 'react'
import styled from 'styled-components';

//Components:
import BodyBlock from './BodyBlock';

//Styles:

const StyledBodyBlock = styled.div`
    text-align: center;
    padding: 20px 20px;
    background-color: lightslategray;
`


//Render:
const MainBodyblock = () => {
    return (
        <StyledBodyBlock>
            <h2>Biologger Features!</h2>
            <BodyBlock
                Title='Test Title' 
                Description='Test Description'
                Img='#'
            />
            <BodyBlock
                Title='Test Title2' 
                Description='Test Description2'
                Img='#'
                Reverse='true'
            />
            <BodyBlock
                Title='Test Title3' 
                Description='Test Description2'
                Img='#'
            />
            
        </StyledBodyBlock>
    )
}

export default MainBodyblock;
