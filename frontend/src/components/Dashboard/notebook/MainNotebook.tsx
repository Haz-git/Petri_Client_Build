import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    top: 6rem;
`;

const FileOptions = styled.div`
    /* margin-top: 4rem; */
    position: fixed;
    top: 13rem;
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
    align-items: flex-start;
    justify-content: flex-start;
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

const FilesScrollableHeader = styled.div``;

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
    const [directoryPathway, setDirectoryPathway] = useState<object[]>([
        { folderName: 'root' },
    ]);
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
            totalEntities = totalEntities.filter((x) => x.parentId === id);

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
                    onClickSelection={() =>
                        toggleSelectedEntity(entity.noteId || entity.folderId)
                    }
                    isSelected={checkSelectedEntity(
                        entity.noteId,
                        entity.folderId
                    )}
                />
            ));
        }
    };

    const findNameOfCurrentDirectory = () => {
        if (notebook !== undefined && notebook !== null) {
            if (id !== 'root') {
                const currFolder = notebook.rootFolders.find(
                    (x) => x.folderId === id
                );

                return currFolder.folderName;
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

            /*TODO - Fix looping:
                1. Insert the current folder into dirPath.
                2. Find current folder's parentId
                3. Find the parentFolder, make that the current folder(?)
                4. Repeat until the parentId === 'root'

            */

            // setDirectoryPathway([...directoryPathway, currFolder]);
        }
    };

    const renderDirectoryPathway = () => {
        let currPathway = createDirectoryPathway();
        currPathway = currPathway?.reverse();

        if (currPathway && currPathway.length < 15) {
            return currPathway.map((directory) => (
                <PathwayText key={directory.folderId}>
                    {`${directory.folderName}/`}
                </PathwayText>
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
                            hoverShadow="none"
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
                        />
                        <FileOptionSpacer />
                        <GeneralButton
                            buttonLabel="Frequent"
                            buttonIcon={<FileIcon />}
                            disableShadow={true}
                            buttonTextColor="#3C4042"
                            buttonBackground="transparent"
                            iconMargin="2rem"
                            fontSize="1.2em"
                            hoverShadow="none"
                        />
                    </FileOptions>
                </Sidebar>
                <FileContainer>
                    <ScrollableWrapperContainer>
                        <PathwayContainer>
                            <PathwayText>Path: //Root/</PathwayText>
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
