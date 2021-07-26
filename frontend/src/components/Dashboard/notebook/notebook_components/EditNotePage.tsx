import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import {
    getNotebook,
    updateNote,
} from '../../../../redux/userNotebook/notebookActions';

//CKEditor:
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { editorConfiguration } from '../../../../utils/ckeditortoolbar';
import { unescape } from 'html-escaper';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div``;

//Interfaces:

interface IDispatchProps {
    getNotebook: (statusCallback: (status: boolean) => void) => void;
    updateNote: (
        noteId: string,
        parentId: string,
        requestType: string,
        updatedHTMLState: string,
        updatedNoteName: string,
        snackbarCallback: (message: string) => void,
        buttonCallback: (status: boolean) => void
    ) => void;
}

interface IMapStateToProps {
    notebook: { rootFiles: any; rootFolders: any };
}

interface IComponentProps {
    match: {
        params: {
            id: string;
        };
    };
}

type EditNotePageProps = IDispatchProps & IMapStateToProps & IComponentProps;

const EditNotePage = ({
    getNotebook,
    notebook,
    match: {
        params: { id },
    },
}: EditNotePageProps): JSX.Element => {
    //Loading handler
    const [isNoteLoaded, setIsNoteLoaded] = useState(false);
    const setLoadedStatus = (status: boolean) => setIsNoteLoaded(status);

    //Note name:
    const [noteName, setNoteName] = useState('');

    //EditorState:
    const [editorState, setEditorState] = useState('');

    //Editor Change State:
    const [editorChange, setEditorChange] = useState('');

    useEffect(() => {
        getNotebook(setLoadedStatus);

        if (isNoteLoaded !== false) findEditorState();
    }, []);

    const findEditorState = () => {
        if (isNoteLoaded !== false) {
            const currentNote = notebook.rootFiles.find(
                (note) => note.noteId === id
            );

            const fixedHTML = unescape(currentNote.htmlState);
            setEditorState(fixedHTML);
        }
    };

    const renderCKEditor = () => {
        if (editorState !== '') {
            return (
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    onChange={handleCKEditorChange}
                    data={editorState}
                />
            );
        } else {
            console.log('No editor state');
        }
    };

    const handleCKEditorChange = (event, editor) => {
        const dataHTML = editor.getData();

        setEditorChange(dataHTML);
    };

    return <MainContainer>{renderCKEditor()}</MainContainer>;
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { updateNote, getNotebook })(
    EditNotePage
);
