import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Link } from 'react-router-dom';
import { parse } from 'flatted';
import HTMLparse from 'html-react-parser';
import {escape, unescape} from 'html-escaper';

const ReadBioNote = ({ match:{params:{id}}, bionotes }) => {
    
    const [ escapedHTMLState, setEscapedHTMLState ] = useState('');
    const [ formattedHTML, setFormattedHTML ] = useState('');

    useEffect(() => {
        renderBioNote();
    },[]);


    const renderBioNote = () => {
        const currentNote = bionotes.bionotes.find(x => x.bioName === id);
        // const jsonCurrentNote = JSON.parse(currentNote.data);
        // contentState = convertFromRaw(jsonCurrentNote);
        // const editorState = EditorState.createWithContent(contentState);
        // setEditorState(editorState);
        const renderData = parse(currentNote.flattedEditorObject);
        setEscapedHTMLState(renderData.dataHTML);

        const fixedHTML = unescape(renderData.dataHTML);

        setFormattedHTML(fixedHTML)


        // setFormattedHTML(fixedHTML.documentElement.textContent);
        // console.log(fixedHTML.documentElement.textContent);
    }

    console.log(formattedHTML)
    
    return (
        <>
            <div>
                {HTMLparse(formattedHTML)}
            </div>
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
