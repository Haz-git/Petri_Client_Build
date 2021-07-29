import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//React Router:
import { Link } from 'react-router-dom';

//Redux:
import { connect } from 'react-redux';
import { getNotebook } from '../../../redux/userNotebook/notebookActions';

//Components:
import GeneralButton from '../general_components/GeneralButton';
import Searchbar from '../general_components/Searchbar';
import AddEntityDropdown from './notebook_components/AddEntityDropdown';
import NotebookEntity from './notebook_components/NotebookEntity';
import NotebookContextMenu from './notebook_components/NotebookContextMenu';
import LoadingDots from '../general_components/animations/LoadingDots';

//Icons:
import { Star } from '@styled-icons/evaicons-solid/Star';
import { Users } from '@styled-icons/heroicons-solid/Users';
import { Timelapse } from '@styled-icons/material-outlined/Timelapse';
import { FilePaper2 } from '@styled-icons/remix-fill/FilePaper2';
import { KeyboardArrowRight } from '@styled-icons/material-outlined/KeyboardArrowRight';

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

const RightArrowIcon = styled(KeyboardArrowRight)`
    color: #423c3c;
    height: 1.5rem;
    width: 1.5rem;
`;

//Styles:
const MainContainer = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 4fr;
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    padding: 1rem 1rem;
    min-width: 15rem;
`;

const AddButtonContainer = styled.div`
    position: fixed;
    top: 6.25rem;
`;

const FileOptions = styled.div`
    /* margin-top: 4rem; */
    position: fixed;
    top: 13.3rem;
    text-align: left;
`;

const FileOptionSpacer = styled.div`
    margin: 0.5rem 0;
`;

const FileContainer = styled.div`
    border-left: 1px solid #ececec;
    text-align: left;
`;

const ScrollableWrapperContainer = styled.div`
    top: 0;
    position: sticky;
    background: #ffffff;
`;

const PathwayContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1em 1em;
    background: #ececec;
    width: 100%;
`;

const PathwayButton = styled(Link)`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 700;
    color: #423c3c;
    cursor: pointer;

    &:focus {
        outline: none;
        text-decoration: none;
    }

    &:hover {
        text-decoration: none;
        color: #4263eb;
    }
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

const FilesScrollableHeader = styled.div``;

const FilesTextHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
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
    padding: 0 2rem;
    overflow-y: scroll;
`;

//Loading Animation:

const LoadingContainer = styled.div`
    text-align: center;
    margin: 10rem auto;
`;

//Interfaces:

interface IDispatchProps {
    getNotebook: (statusCallback: (status: boolean) => void) => void;
}

interface IMapStateToProps {
    notebook: { rootFiles: any; rootFolders: any };
}

interface IComponentProps {
    match: {
        params: { id: any };
    };
}

type MainNotebookProps = IDispatchProps & IMapStateToProps & IComponentProps;

const MainNotebook = ({
    getNotebook,
    notebook,
    match: {
        params: { id },
    },
}: MainNotebookProps): JSX.Element => {
    //View Controller for Notebook: DEFAULT || STARRED || RECENT

    const [notebookView, setNotebookView] = useState('DEFAULT');

    const [isNotebookLoaded, setIsNotebookLoaded] = useState(false);

    const setLoadedStatus = (status: boolean) => setIsNotebookLoaded(status);

    useEffect(() => {
        getNotebook(setLoadedStatus);
    }, []);

    //Entity background selection state: the entity color property should be changed on first click, to indicate selection of item. Double-click should enter/edit the entity.
    const [selectedEntity, setSelectedEntity] = useState('');

    const toggleSelectedEntity = (entityId: string) => {
        setSelectedEntity(entityId);
    };

    const checkSelectedEntity = (noteId: string, folderId: string) => {
        let trueId = noteId === undefined ? folderId : noteId;

        if (trueId === selectedEntity) return true;
        else return false;
    };

    const renderNotebookEntities = () => {
        if (notebook !== undefined && notebook !== null) {
            let totalEntities = notebook.rootFolders.concat(notebook.rootFiles);

            switch (notebookView) {
                case 'DEFAULT':
                    if (id === 'root') {
                        totalEntities = totalEntities.filter(
                            (x) => x.parentId === id
                        );
                    } else {
                        let currentEntity = totalEntities.find((x) => {
                            if (x.noteId === id || x.folderId === id)
                                return true;
                        });

                        totalEntities = currentEntity.children;
                    }
                    console.log('default view');
                    break;
                case 'STARRED':
                    totalEntities = totalEntities.filter(
                        (x) => x.isStarred === 'TRUE'
                    );
                    console.log('starred view');
                    break;
                case 'RECENT':
                    totalEntities = totalEntities.sort(
                        (a, b) => a.dateModified - b.dateModified
                    );

                    console.log('recent view');
                    break;
                default:
                    throw new Error(
                        'Something when wrong rendering your notebook views. The notebookView was not specified.'
                    );
            }

            if (totalEntities !== undefined && totalEntities !== null) {
                return totalEntities.map((entity) => (
                    <NotebookEntity
                        key={entity.noteId || entity.folderId}
                        noteName={entity.noteName}
                        noteId={entity.noteId}
                        parentId={entity.parentId}
                        folderName={entity.folderName}
                        folderId={entity.folderId}
                        ownerName={entity.ownerName}
                        dateCreated={entity.dateCreated}
                        dateModified={entity.dateModified}
                        isStarred={entity.isStarred}
                        onClickSelection={() =>
                            toggleSelectedEntity(
                                entity.noteId || entity.folderId
                            )
                        }
                        isSelected={checkSelectedEntity(
                            entity.noteId,
                            entity.folderId
                        )}
                    />
                ));
            } else {
                return (
                    <h1>Sorry, we're unable to find your notebook page...</h1>
                );
            }
        }
    };

    const findNameOfCurrentDirectory = () => {
        if (notebook !== undefined && notebook !== null) {
            if (id !== 'root') {
                const currFolder = notebook.rootFolders.find(
                    (x) => x.folderId === id
                );

                if (currFolder !== undefined && currFolder !== null) {
                    return currFolder.folderName.length > 70
                        ? currFolder.folderName.substr(0, 70).concat('.....')
                        : currFolder.folderName;
                }

                return 'Error: Unable to find notebook page.';
            }

            return 'root';
        }
    };

    const pushParentDir = (currDir: any, notebook: any, dirPath: any) => {
        if (currDir === undefined || currDir === null) return;

        let currObj = {
            folderId: currDir.folderId,
            folderName: currDir.folderName,
        };

        dirPath.push(currObj);

        let parentFolder = notebook.rootFolders.find(
            (x) => x.folderId === currDir.parentId
        );

        return pushParentDir(parentFolder, notebook, dirPath);
    };

    const createDirectoryPathway = () => {
        if (notebook !== undefined && notebook !== null) {
            if (id !== 'root') {
                let notebookCopy = notebook;
                let dirPath: { folderId: string; folderName: string }[] = [];

                let currFolder = notebookCopy.rootFolders.find(
                    (x) => x.folderId === id
                );

                pushParentDir(currFolder, notebookCopy, dirPath);

                return dirPath;
            }
        }
    };

    const renderDirectoryPathway = () => {
        let currPathway = createDirectoryPathway();
        currPathway = currPathway?.reverse();

        if (currPathway && currPathway.length < 15) {
            return currPathway.map((directory) => (
                <PathwayButton
                    to={`/notebook/${directory.folderId}`}
                    key={directory.folderId}
                >
                    <RightArrowIcon />
                    {`${
                        directory.folderName.length > 8
                            ? directory.folderName.substr(0, 8).concat('...')
                            : directory.folderName
                    }`}
                </PathwayButton>
            ));
        } else {
            return null;
        }
    };

    const renderLoadingStatus = () => {
        return (
            <LoadingContainer>
                <LoadingDots />
            </LoadingContainer>
        );
    };

    const StarredViewToggler = () => {
        if (notebookView === 'STARRED') setNotebookView('DEFAULT');

        setNotebookView('STARRED');
    };

    const RecentViewToggler = () => {
        if (notebookView === 'RECENT') setNotebookView('DEFAULT');

        setNotebookView('RECENT');
    };

    return (
        <>
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
                            hoverShadow="none"
                            onClick={StarredViewToggler}
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
                            hoverShadow="none"
                            onClick={RecentViewToggler}
                        />
                        <FileOptionSpacer />
                    </FileOptions>
                </Sidebar>
                <FileContainer>
                    <ScrollableWrapperContainer>
                        <PathwayContainer>
                            <PathwayButton to={`/notebook/root`}>
                                Root
                            </PathwayButton>
                            {renderDirectoryPathway()}
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
                                <DirectoryText>
                                    All Entities in:{'  '}
                                    {findNameOfCurrentDirectory()}
                                </DirectoryText>
                            </FilesScrollableHeader>
                        </FilesWrapper>
                    </ScrollableWrapperContainer>
                    <NotebookEntityWrapper>
                        {isNotebookLoaded === true
                            ? renderNotebookEntities()
                            : renderLoadingStatus()}
                    </NotebookEntityWrapper>
                </FileContainer>
            </MainContainer>
            <NotebookContextMenu id={'NOTEBOOKCONTEXTMENU'} />
        </>
    );
};

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        notebook: state.notebook.notebook,
    };
};

export default connect(mapStateToProps, { getNotebook })(MainNotebook);
