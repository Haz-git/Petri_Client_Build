import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { getBioNotes } from '../../../redux/userBioNote/bionoteActions';
import styled from 'styled-components';

//Components:
import BioNoteCard from './BioNoteCard';

//Styles:
import { Button } from 'react-bootstrap';
import { PencilSquare } from '@styled-icons/bootstrap/PencilSquare';
import Fade from 'react-reveal/Fade';


const MainBioNotesHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
`

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: white;
`

const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 20px;
`

const PencilIcon = styled(PencilSquare)`
    height: 20px;
    width: 20px;
    vertical-align: sub;
    margin-left: 7px;
`


const NoteCardContainer = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    padding-right: 50px;
`

//Render:

const CreateBioNote = ({ bionotes, getBioNotes }) => {

    useEffect(() => {
        getBioNotes()

    },[]);

    const renderNotes = () => {
        if (bionotes !== undefined && bionotes !== null) {
            return (
                bionotes.map(note => (
                    <Fade>
                        <BioNoteCard key={uuid()} name={note.bioName} />
                    </Fade>
                ))
            )
        } else {
            return null;
        }
    }

    return (
        <>
            <MainBioNotesHeaderContainer>
                <Fade>
                    <StyledMainHeader>Your Bio-Notes</StyledMainHeader>
                </Fade>
            </MainBioNotesHeaderContainer>
            <ButtonContainer>
                    <Link to='newbionote'>
                        <Button variant='primary'>
                            Create a New BioNote
                            <PencilIcon />
                        </Button>
                    </Link>
            </ButtonContainer>
            <NoteCardContainer>
                {renderNotes()}
            </NoteCardContainer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        bionotes: state.bionotes.bionotes,
    }
}


export default connect(mapStateToProps, { getBioNotes })(CreateBioNote);
