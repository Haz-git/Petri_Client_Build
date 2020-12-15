import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createNewBioNote } from '../../../redux/userBioNote/bionoteActions';
import { Link } from 'react-router-dom';

//CkEditor:
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { editorConfiguration } from '../../../utils/ckeditortoolbar';

//Editor imports:
// import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';

//Styles:
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

// const StickyEditor = styled(Editor)`
//     position: -webkit-sticky;
//     position: sticky;
//     top: 0;
// `

const StyledInput = styled.input`
    height: 35px;
    width: 400px;
    border-radius: 5px;
    padding: 5px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
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


const NewBioNote = ({ createNewBioNote }) => {

    //Creating editor state for draftJS editor:
    const [ editorState, setEditorState ] = useState({});

    //Creating state for name input:
    const [ bioName, setBioName ] = useState('');

    const handleNameChange = e => {
        setBioName(e.target.value);
    }
    

    // const handleEditorStateChange = editorState => {
    //     // setEditorState(editorState);
    // }

    const onEditorSubmit = (e) => {
        e.preventDefault();
        createNewBioNote(bioName, editorState);
    }

    const handleCKEditorChange = (event, editor) => {
        const dataHTML = editor.getData();
        const dataEditor = editor;

        setEditorState({
            dataEditor,
            dataHTML,
        })


        //I'm not sure which of these to store in the DB. Maybe all of them in an object?
        //Maybe i'll store the editor and editor.getData() contents in an object.
    }

    return (
        <>
            <MainEditorContainer>
                <form onSubmit={onEditorSubmit}>
                    <NameContainer>
                        <StyledInput
                            name='bionoteName'
                            type='text'
                            placeholder='Enter Name..'
                            value={bioName}
                            onChange={handleNameChange}
                            autoComplete='off'
                        />
                    </NameContainer>
                    <EditorContainer>
                        <CKEditor
                            editor={ Editor }
                            config={ editorConfiguration }
                            onChange={handleCKEditorChange}
                        />
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
        </>
    )
}

/*
The main goal here is to:

1. Learn how to save documents into mongoDB into each individual user.
**WE ARE HERE**

We've now learned how to save the user's writing temporarily in the content state. We still need to create routing to our backend that will push this document into the user's stuff. 

https://www.youtube.com/watch?v=AgreDlNaUn4 @ timestamp 38:21 --> He's setting up the model necessary for creating the blog...--> this model is only necessary for when we 'share' the blogs to the people on the app.

**Update: We've currently implemented basic routing and had our _id and contents/file array to be sent over to the backend. It remains unknown whether we can just store this content data 'as is' and then use it to render it back out onto the screen...

**Update: We might have to ditch react-quill much to my dismay. The documentation is pretty nasty, and it doesn't really give good examples. I've found this to be better:
https://jpuri.github.io/react-draft-wysiwyg/#/docs

2. Learn how to load documents into the loading component "createbionote" --> perhaps a simple listing pattern?

**Finished this--> Probably will take a break for now. I have stored the bionote information in my DB
and re-rendered a simple system with all of my bionotes listed. 11/11/2020

I have included buttons that are 'read', 'edit', and 'delete'. They link to components that will TAKE in the NAME of the bionote as a wildcard param, and using that, I should be able to render the bionote via:
https://codepulse.blog/simple-easy-way-display-draft-js-content/

and the edit/delete i'll probably need an action creator and a POST/PATCH request to the server.


3. Learn how to grab HTML info from mongodb and re-render HTML document upon clicking it.. 
4. 





*/

export default connect(null, { createNewBioNote })(NewBioNote);
