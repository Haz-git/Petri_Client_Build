import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateBioNote } from '../../../redux/userBioNote/bionoteActions';

//Editor Imports:
// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { parse } from 'flatted';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { editorConfiguration } from '../../../utils/ckeditortoolbar';
import {escape, unescape} from 'html-escaper';
import CircularProgress from '@material-ui/core/CircularProgress';

//Styles:
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { Button } from 'react-bootstrap';
import { CaretBack } from '@styled-icons/ionicons-outline/CaretBack';
import { Save } from '@styled-icons/entypo/Save';

const MainEditorContainer = styled.div`
    padding: 30px 30px;
`

const NameContainer = styled.div`
    text-align: center;
    background-color: #242746;
    color: white;
    padding: 10px 10px;
    font-size: 25px;
    font-family: 'Montserrat', sans-serif;
`

const EditorContainer = styled.div`
    padding: 10px 10px;
    border: 1px solid #242746;
    background-color: white;
    height: 78vh;
    overflow-y: auto;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 5px rgba(0, 0, 0, 0.06),
        0 22.3px 10px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 80px rgba(0, 0, 0, 0.12);
    ;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 10px;
`

const StyledButton = styled(Button)`
    margin-left: 7px;
    margin-right: 7px;
`

const SaveIcon = styled(Save)`
    height: 23px;
    width: 23px;
    margin-right: 7px;
    vertical-align: sub;
`
const CaretIcon = styled(CaretBack)`
    height: 23px;
    width: 23px;
    margin-right: 7px;
    vertical-align: sub;
`



//Render:


const EditBioNote = ({ match:{params:{id}}, bionotes, updateBioNote }) => {

    const [ editorState, setEditorState ] = useState(null);
    const [ bioNoteName, setBioNoteName ] = useState('');
    const [ editorChange, setEditorChange ] = useState('');

    useEffect(() => {
        setBioNoteName(id);
        findEditorState();
    },[]);


    const findEditorState = () => {
        const currentNote = bionotes.bionotes.find(x => x.bioName === id);
        const fixedHTML = unescape(currentNote.htmlState);
        setEditorState(fixedHTML);
    }

    const renderCKEditor = () => {
        if (editorState === null ) {
            return null;
        } else {
            return (
                <CKEditor
                    editor={ Editor }
                    config={ editorConfiguration }
                    onChange={ handleCKEditorChange }
                    data={ editorState }
                />
            )
        }
    }


    const handleCKEditorChange = (event, editor) => {
        const dataHTML = editor.getData();

        setEditorChange(dataHTML)

    }

    const onEditorSubmit = (e) => {
        e.preventDefault();
        updateBioNote(bioNoteName, editorChange);
    }

    const renderName = () => {
        return (
            <Fade>
                <NameContainer>{id}</NameContainer>
            </Fade>
        )
    }

    return (
        <>
            <Fade>
                <MainEditorContainer>
                    {renderName()}
                    <form onSubmit={onEditorSubmit}>
                        <EditorContainer>
                            {renderCKEditor()}
                        </EditorContainer>
                        <ButtonContainer>
                            <Link to='/createbionote'>
                                <StyledButton variant='secondary' size='lg'>
                                    <CaretIcon />
                                    Your Existing Bionotes
                                </StyledButton>
                            </Link>
                            <StyledButton variant='success' type='submit' size='lg'>
                                <SaveIcon />
                                Save
                            </StyledButton>
                        </ButtonContainer>
                    </form>
                </MainEditorContainer>
            </Fade>
        </>
    )
}

const mapStateToProps = state => {

    return {
        bionotes: state.bionotes,
    }
}

export default connect(mapStateToProps, { updateBioNote })(EditBioNote);
