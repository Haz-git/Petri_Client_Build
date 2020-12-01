import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Styles:
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

const MainCardContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
    padding: 10px 10px;
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    
`

const CardInfoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`
const LinkContainer = styled.div`
    display: flex;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-left: 6px;
    margin-right: 6px;
`

const StyledTitle = styled.p`
    margin: 0;
    font-size: 20px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;

`

const BioNoteCard = ({ name }) => {
    return (
        <MainCardContainer>
            <CardInfoContainer>
                <StyledTitle>{name}</StyledTitle>
                <LinkContainer>
                    <ButtonGroup size='lg' className='mb-2'>
                        <StyledLink to={`/readbionote/${name}`}>
                            <Button variant='success'>
                                Read
                            </Button>
                        </StyledLink>
                        <StyledLink to={`/editbionote/${name}`}>
                            <Button variant='warning'>
                                Edit
                            </Button>
                        </StyledLink>
                        <StyledLink to={`/deletebionote/${name}`}>
                            <Button variant='danger'>
                                Delete
                            </Button>
                        </StyledLink>
                    </ButtonGroup>
                </LinkContainer>
            </CardInfoContainer>
        </MainCardContainer>
    )
}

/*Todo Implementations:
1. Add View button --> Renders out bionote with formatting
2. Add Delete button 
3. Add Edit button --> Opens editor with button with text + formatting + button for saving.

*/

export default BioNoteCard;