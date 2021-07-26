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
    updateNote,
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
    const [isNewNote, setIsNewNote] = useState(true);

    useEffect(() => {
        getNotebook(setLoadedStatus);
    }, []);

    useEffect(() => {
        findEditorState();
    }, [notebook]);

    console.log(isNoteLoaded);

    const findEditorState = () => {
        if (
            isNoteLoaded !== false &&
            notebook !== undefined &&
            notebook !== null
        ) {
            const currentNote = notebook.rootFiles.find(
                (note) => note.noteId === id
            );

            if (currentNote.htmlState !== '') {
                setIsNewNote(false);
                const fixedHTML = unescape(currentNote.htmlState);
                setEditorState(fixedHTML);
            }

            console.log('Editor state should be updated...');
        }
    };

    const renderCKEditor = () => {
        if (editorState !== '' && isNewNote !== true) {
            return (
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    onChange={handleCKEditorChange}
                    data={editorState}
                />
            );
        } else if (isNewNote !== false) {
            return (
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    onChange={handleCKEditorChange}
                    onInit={(editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                'height',
                                '100%',
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                />
            );
        } else {
            console.log('Something wrong with renderCKEditor()');
        }
    };

    const handleCKEditorChange = (event, editor) => {
        const dataHTML = editor.getData();

        setEditorChange(dataHTML);
    };

    return (
        <>{isNoteLoaded && <MainContainer>{renderCKEditor()}</MainContainer>}</>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { updateNote, getNotebook })(
    EditNotePage
);
