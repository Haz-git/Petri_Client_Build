import React from 'react';
import styled from 'styled-components';

//Styles:

import {Button} from 'react-bootstrap';

const SciCardMainContainer = styled.div`
    display: grid;
    background-color: white;
    padding: 4px 4px;
    grid-template-columns: 40% 60%;
`

const DescriptionContainer = styled.div`
    background-color: 
    padding-left: 10px;
    padding-right: 10px;
`

const StyledImage = styled.img`
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    text-align: center;
`

const HeadlineHeader = styled.h2`
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    text-align: center;
    font-weight: 600;
`

const AuthorLine = styled.h4`
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    text-align: center;
    font-weight: 200;
`

const TimeLine = styled.p`
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    text-align: center;
    font-weight: 200;
`
const DescLine = styled.p`
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    text-align: justify;
    font-weight: 500;
`


//Render:

const SciCard = ({
    source,
    author,
    title,
    description,
    url,
    img,
    pubTime
}) => {

    const renderAuthor = () => {
        if (author) {
            return <AuthorLine>By: {author}</AuthorLine>
        } else {
            return null;
        }
    }

    const renderImg = () => {
        if (img) {
            return <StyledImage src={img} alt='Img'></StyledImage>
        } else {
            return <div>We're Sorry. There's no image supplied for this article.</div>
        }
    }

    return (
        <>
            <SciCardMainContainer>
                <DescriptionContainer>
                    <HeadlineHeader>{title}</HeadlineHeader>
                    {renderAuthor()}
                    <TimeLine>Published On: {pubTime}</TimeLine>
                    <DescLine>{description}</DescLine>
                    <div>
                        <a href={url}>
                            <Button variant='primary'>Read Full Article</Button>
                        </a>
                    </div>
                </DescriptionContainer>
                <div>
                    <div>
                        <StyledImage src={img} alt='Img'></StyledImage>
                    </div>
                </div>
            </SciCardMainContainer>
        </>
    )
}

export default SciCard;