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

const MainContainer = styled.div`
    background-color: ${(props) => props.theme.bionotesContainerBGColor};
    height: 100vh;
`;

const MainBioNotesHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: ${(props) => props.theme.settingsHeaderBG};
    height: 85px;
    border-left: 1px solid #f6f9fc;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 1px 1px rgba(0, 0, 0, 0.048), 0 2px 2px rgba(0, 0, 0, 0.06),
        0 3px 3px rgba(0, 0, 0, 0.072), 0 3px 4px rgba(0, 0, 0, 0.086),
        0 2px 1px rgba(0, 0, 0, 0.12); ;
`;

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: ${(props) => props.theme.settingsMainHeaderTextC};
`;

const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 20px;
`;

const PencilIcon = styled(PencilSquare)`
    height: 20px;
    width: 20px;
    vertical-align: sub;
    margin-left: 7px;
`;

const NoteCardContainer = styled.div`
    display: grid;
    grid-gap: 1rem;
    margin: 0 auto;
    max-width: 400px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

//Render:

const CreateBioNote = ({ bionotes, getBioNotes }) => {
    useEffect(() => {
        getBioNotes();
    }, []);

    const renderNotes = () => {
        if (bionotes !== undefined && bionotes !== null) {
            return bionotes.map((note) => (
                <Fade>
                    <BioNoteCard
                        key={uuid()}
                        name={note.bioName}
                        bionote_ID={note.bionote_ID}
                    />
                </Fade>
            ));
        } else {
            return null;
        }
    };

    return (
        <>
            <MainContainer>
                <MainBioNotesHeaderContainer>
                    <Fade>
                        <StyledMainHeader>Your Bio-Notes</StyledMainHeader>
                    </Fade>
                </MainBioNotesHeaderContainer>
                <ButtonContainer>
                    <Link to="newbionote">
                        <Button variant="primary">
                            Create a New BioNote
                            <PencilIcon />
                        </Button>
                    </Link>
                </ButtonContainer>
                <NoteCardContainer>{renderNotes()}</NoteCardContainer>
            </MainContainer>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        bionotes: state.bionotes.bionotes,
    };
};

export default connect(mapStateToProps, { getBioNotes })(CreateBioNote);
