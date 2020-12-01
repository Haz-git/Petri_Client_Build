import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateBioNote } from '../../../redux/userBioNote/bionoteActions';

//Editor Imports:
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditBioNote = ({ match:{params:{id}}, bionotes, updateBioNote }) => {

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());
    const [ bioNoteName, setBioNoteName ] = useState('');

    useEffect(() => {
        setBioNoteName(id);
        renderBioNote();
    },[]);

    const renderBioNote = () => {
        const currentNote = bionotes.bionotes.find(x => x.bioName === id);
        const jsonCurrentNote = JSON.parse(currentNote.data);
        const contentState = convertFromRaw(jsonCurrentNote);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    }

    const handleEditorStateChange = editorState => {
        setEditorState(editorState);
    }

    const onEditorSubmit = (e) => {
        e.preventDefault();
        updateBioNote(bioNoteName, convertToRaw(editorState.getCurrentContent()));
    }

    return (
        <>
            <div>
                <form onSubmit={onEditorSubmit}>
                    <Editor
                        editorState={editorState}
                        toolbar={{
                            inline: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            image: { previewImage: true },
                        }}
                        onEditorStateChange={handleEditorStateChange}
                    />
                    <div>
                        <button type='submit'>Save Bionote</button>
                    </div>
                </form>
            </div>
            <Link to='/createbionote'>Go Back</Link>
        </>
    )
}

const mapStateToProps = state => {
    return {
        bionotes: state.bionotes,
    }
}

export default connect(mapStateToProps, { updateBioNote })(EditBioNote);
