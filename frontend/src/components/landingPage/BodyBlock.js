import React from 'react';
import styled from 'styled-components';

//Styles:
const BlockDetailMain = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
`
const BlockDetail = styled.div`
    display: inline-block;

`

//Helper Functions:

const reverseComponent = (title, description, img) => {
    return (
        <>
            <BlockDetail>
                <h2>This is an Image placeholder</h2>
            </BlockDetail>
            <BlockDetail>
                <h2>{title}</h2>
                <p>{description}</p>
            </BlockDetail>
        </>
    )
}

//Render:
const BodyBlock = ({Title, Description, Img, Reverse}) => {

    if (Reverse === 'true') {
        return (
            <BlockDetailMain>
                {reverseComponent(Title, Description, Img)}
            </BlockDetailMain>
        )
    }

    return (
        <BlockDetailMain>
            <BlockDetail>
                <h2>{Title}</h2>
                <p>{Description}</p>
            </BlockDetail>
            <BlockDetail>
                <h2>This is an Image placeholder</h2>
            </BlockDetail>
        </BlockDetailMain>
    )
}

export default BodyBlock;