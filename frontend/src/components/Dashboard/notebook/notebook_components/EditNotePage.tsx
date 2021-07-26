import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import {
    getNotebook,
    updateNote,
} from '../../../../redux/userNotebook/notebookActions';
import { toggleSnackbarOpen } from '../../../../redux/snackBar/snackBarActions';

//Components:
import historyObject from '../../../../historyObject';
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

const MainContainer = styled.div``;

const UpperContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1rem 0.5rem 1rem;
`;

const TextFieldContainer = styled.div`
    width: 100%;
    max-width: 50rem;
    margin-right: 2rem;
`;

const EditorWrapper = styled.div`
    padding: 0.5rem 1rem;
`;

const EditorContainer = styled.div`
    overflow-x: hidden;
    .ck-editor__editable {
        height: ${(props) => `${props.editorHeight - 150}px`};
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonSpacer = styled.div`
    width: 2rem;
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
    toggleSnackbarOpen: (message: string) => void;
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
    toggleSnackbarOpen,
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

    //Button state:
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    //Window dimensions:
    const { height, width } = useWindowDimensions();

    //Note name:
    const [noteName, setNoteName] = useState('');
    const [newNoteName, setNewNoteName] = useState('');

    //parentId
    const [noteParentId, setNoteParentId] = useState('');

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

            if (currentNote) {
                setNoteParentId(currentNote.parentId);
                setNoteName(currentNote.noteName);
                if (currentNote.htmlState !== '') {
                    setIsNewNote(false);
                    const fixedHTML = unescape(currentNote.htmlState);
                    setEditorState(fixedHTML);
                }

                console.log('Editor state should be updated...');
            }
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
                />
            );
        } else {
            console.log('Something wrong with renderCKEditor()');
        }
    };

    const setButtonState = (status: boolean) => setIsButtonLoading(status);

    const handleCKEditorChange = (event, editor) => {
        const dataHTML = editor.getData();
        setEditorChange(dataHTML);
    };

    const handleNewNoteNameChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewNoteName(e.target.value);
    };

    //Check for editorChange or newNoteName Change (prompt for unsaved information)

    //Send User to notebook:
    const sendUserToNotebook = () => {
        historyObject.push('/notebook/root');
    };

    //Button Handlers:
    const onEditorSaveHandler = () => {
        setButtonState(true);
        if (editorChange !== '' && newNoteName !== '') {
            updateNote(
                id,
                noteParentId,
                'UPDATE_ALL',
                editorChange,
                newNoteName,
                toggleSnackbarOpen,
                setButtonState
            );
        } else if (editorChange !== '' && newNoteName === '') {
            updateNote(
                id,
                noteParentId,
                'UPDATE_HTML',
                editorChange,
                newNoteName,
                toggleSnackbarOpen,
                setButtonState
            );
        } else if (newNoteName !== '' && editorChange === '') {
            updateNote(
                id,
                noteParentId,
                'UPDATE_NAME',
                editorChange,
                newNoteName,
                toggleSnackbarOpen,
                setButtonState
            );
        } else {
            alert(
                'An error occurred, your note could not be saved. Please submit a bug report.'
            );
            setButtonState(false);
        }
    };

    return (
        <MainContainer>
            <UpperContainer>
                <TextFieldContainer>
                    <GeneralTextField
                        placeholder={noteName}
                        onChange={handleNewNoteNameChange}
                    />
                </TextFieldContainer>
                <ButtonContainer>
                    <GeneralButton
                        buttonLabel="Return"
                        buttonBackground="rgba(0, 0, 34, 0.1)"
                        buttonTextColor="rgba(5, 5, 20, 0.7)"
                        onClick={sendUserToNotebook}
                    />
                    <ButtonSpacer />
                    <GeneralButton
                        buttonLabel={
                            isButtonLoading === true ? 'Saving...' : 'Save'
                        }
                        onClick={onEditorSaveHandler}
                        isDisabledOnLoading={isButtonLoading}
                    />
                </ButtonContainer>
            </UpperContainer>
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

export default connect(mapStateToProps, {
    updateNote,
    getNotebook,
    toggleSnackbarOpen,
})(EditNotePage);
