import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import {
    getNotebook,
    updateNote,
} from '../../../../redux/userNotebook/notebookActions';

//Components:
import GeneralTextField from '../../general_components/GeneralTextField';
import GeneralButton from '../../general_components/GeneralButton';

//Hooks:
import useWindowDimensions from '../../../../utils/hooks/useWindowDimensions';

//CKEditor:
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { editorConfiguration } from '../../../../utils/ckeditortoolbar';
import { unescape } from 'html-escaper';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    overflow-y: hidden;
`;

const NameContainer = styled.div`
    padding: 1rem 1rem;
`;

const EditorWrapper = styled.div`
    padding: 1rem 1rem;
`;

const EditorContainer = styled.div`
    .ck-editor__editable {
        height: ${(props) => `${props.editorHeight - 168}px`};
    }
`;

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

    //Window dimensions:
    const { height, width } = useWindowDimensions();

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

    console.log(height);

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
        <MainContainer>
            <NameContainer>
                Name
                <GeneralTextField />
            </NameContainer>
            <EditorWrapper>
                <EditorContainer editorHeight={height}>
                    {renderCKEditor()}
                </EditorContainer>
            </EditorWrapper>
        </MainContainer>
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
