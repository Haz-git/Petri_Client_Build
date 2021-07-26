import React, { useState, useEffect } from 'react';

//Redux:
import { connect } from 'react-redux';
import { getNotebook } from '../../../../redux/userNotebook/notebookActions';

//CKEditor:
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { editorConfiguration } from '../../../../utils/ckeditortoolbar';
import { unescape } from 'html-escaper';

//Styles:
import styled from 'styled-components';

//Interfaces:

interface IDispatchProps {
    getNotebook: (statusCallback: (status: boolean) => void) => void;
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
    const [isNoteLoaded, setIsNoteLoaded] = useState(false);
    const setLoadedStatus = (status: boolean) => setIsNoteLoaded(status);

    useEffect(() => {
        getNotebook(setLoadedStatus);
    }, []);

    return <div>This is a page for editing notes</div>;
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { getNotebook })(EditNotePage);
