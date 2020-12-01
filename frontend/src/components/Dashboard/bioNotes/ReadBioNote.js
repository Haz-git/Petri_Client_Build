import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';

const ReadBioNote = ({ match:{params:{id}}, bionotes }) => {
    
    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    useEffect(() => {
        renderBioNote();
    },[]);

    const renderBioNote = () => {
        const currentNote = bionotes.bionotes.find(x => x.bioName === id);
        const jsonCurrentNote = JSON.parse(currentNote.data);
        const contentState = convertFromRaw(jsonCurrentNote);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
    }
    
    return (
        <>
            <Editor
                editorState={editorState}
                readOnly={true}
            />
            <div>
                <Link to='/createbionote'>Go Back</Link>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        bionotes: state.bionotes,
    }
}

export default connect(mapStateToProps)(ReadBioNote);
