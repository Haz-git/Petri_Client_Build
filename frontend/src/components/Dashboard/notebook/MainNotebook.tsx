import React, { useEffect } from 'react';
import styled from 'styled-components';

//Redux:
import { connect } from 'react-redux';
import { getNotebook } from '../../../redux/userNotebook/notebookActions';

//Components:
import GeneralButton from '../general_components/GeneralButton';
import Searchbar from '../general_components/Searchbar';
import AddEntityDropdown from './notebook_components/AddEntityDropdown';
import NotebookEntity from './notebook_components/NotebookEntity';

//Icons:
import { Star } from '@styled-icons/evaicons-solid/Star';
import { Users } from '@styled-icons/heroicons-solid/Users';
import { Timelapse } from '@styled-icons/material-outlined/Timelapse';
import { FilePaper2 } from '@styled-icons/remix-fill/FilePaper2';

const StarIcon = styled(Star)`
    color: #3c4042;
    height: 1.5rem;
    width: 1.5rem;
`;

const UsersIcon = styled(Users)`
    color: #3c4042;
    height: 1.5rem;
    width: 1.5rem;
`;

const TimelapseIcon = styled(Timelapse)`
    color: #3c4042;
    height: 1.5rem;
    width: 1.5rem;
`;

const FileIcon = styled(FilePaper2)`
    color: #3c4042;
    height: 1.5rem;
    width: 1.5rem;
`;

//Styles:
const MainContainer = styled.div`
    /* min-height: 100%; */
    height: 100vh;
    display: grid;
    grid-template-columns: 0.75fr 4fr;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    /* border-right: 1px solid #ececec; */
    padding: 1rem 1rem;
`;

const AddButtonContainer = styled.div``;

const FileOptions = styled.div`
    margin-top: 4rem;
`;

const FileOptionSpacer = styled.div`
    margin: 0.5rem 0;
`;

const FileContainer = styled.div`
    border-left: 1px solid #ececec;
    text-align: left;
`;

const PathwayContainer = styled.div`
    padding: 1em 1em;
    background: #ececec;
    width: 100%;
`;

const PathwayText = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 700;
    color: #423c3c;
`;

const SearchbarContainer = styled.div`
    margin-top: 2.6rem;
    padding: 0 2rem;
    max-width: 60rem;
`;

const FilesWrapper = styled.div`
    margin-top: 4.7rem;
    padding: 0 2rem;
`;

const FilesScrollableHeader = styled.div`
    position: sticky;
`;

const FilesTextHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 2fr));
    padding: 0 1rem;
`;

const HeaderText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 600;
    color: #423c3c;
`;

const FilesTextLine = styled.div`
    margin-top: 0.5rem;
    border-bottom: 2px solid #423c3c;
`;

const DirectoryText = styled.div`
    font-family: 'Lato', sans-serif;
    font-size: 1.1em;
    font-weight: 400;
    color: #423c3c;
    background: #ececec;
    padding: 1rem 1rem;
`;

const NotebookEntityWrapper = styled.div`
    overflow-y: scroll;
`;

//Interfaces:

interface IDispatchProps {
    getNotebook: () => void;
}

interface IMapStateToProps {
    notebook: { rootFiles: any; rootFolders: any };
}

type MainNotebookProps = IDispatchProps & IMapStateToProps;

const MainNotebook = ({
    getNotebook,
    notebook,
}: MainNotebookProps): JSX.Element => {
    useEffect(() => {
        getNotebook();
    }, []);

    const renderNotebookEntities = () => {
        if (notebook !== undefined && notebook !== null) {
            let totalEntities = notebook.rootFolders.concat(notebook.rootFiles);
            totalEntities = totalEntities.filter((x) => x.parentId === 'root');

            return totalEntities.map((entity) => (
                <NotebookEntity
                    noteName={entity.noteName}
                    noteId={entity.noteId}
                    parentId={entity.parentId}
                    folderName={entity.folderName}
                    folderId={entity.folderId}
                    ownerName={entity.ownerName}
                    dateCreated={entity.dateCreated}
                    dateModified={entity.dateModified}
                />
            ));
        }
    };

    return (
        <MainContainer>
            <Sidebar>
                <AddButtonContainer>
                    <AddEntityDropdown />
                </AddButtonContainer>
                <FileOptions>
                    <GeneralButton
                        buttonLabel="Starred"
                        buttonIcon={<StarIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                        fontSize="1.2em"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Shared"
                        buttonIcon={<UsersIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                        fontSize="1.2em"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Recent"
                        buttonIcon={<TimelapseIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                        fontSize="1.2em"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Suggested"
                        buttonIcon={<FileIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                        fontSize="1.2em"
                    />
                </FileOptions>
            </Sidebar>
            <FileContainer>
                <PathwayContainer>
                    <PathwayText>Path: // Root</PathwayText>
                </PathwayContainer>
                <SearchbarContainer>
                    <Searchbar />
                </SearchbarContainer>
                <FilesWrapper>
                    <FilesScrollableHeader>
                        <FilesTextHeader>
                            <HeaderText>Name</HeaderText>
                            <HeaderText>Owner</HeaderText>
                            <HeaderText>Date Created</HeaderText>
                            <HeaderText>Last Modified</HeaderText>
                        </FilesTextHeader>
                        <FilesTextLine />
                        <DirectoryText>All Entities in: Root</DirectoryText>
                    </FilesScrollableHeader>
                    <NotebookEntityWrapper>
                        {renderNotebookEntities()}
                    </NotebookEntityWrapper>
                </FilesWrapper>
            </FileContainer>
        </MainContainer>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { getNotebook })(MainNotebook);
