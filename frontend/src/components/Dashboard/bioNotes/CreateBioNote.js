import React, { useEffect } from 'react';
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


const HeaderContainer = styled.div`
    text-align: center;
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

const MainHeader = styled.h1`
    margin: 0;
    font-weight: 900;
    font-size: 60px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    margin-bottom: 30px;
    color: #293241;
    font-family: 'Catamaran', sans-serif;
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
        getBioNotes();
    },[]);

    const renderNotes = () => (
        bionotes.map(note => (
            <BioNoteCard key={uuid()} name={note.bioName} />
        ))
    )

    return (
        <>
            <HeaderContainer>
                <MainHeader>Your Bio-Notes</MainHeader>
            </HeaderContainer>
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
