import React from 'react';
import styled from 'styled-components';
import GeneralButton from '../general_components/GeneralButton';

import { Add } from '@styled-icons/material/Add';
import { Star } from '@styled-icons/evaicons-solid/Star';
import { Users } from '@styled-icons/heroicons-solid/Users';
import { Timelapse } from '@styled-icons/material-outlined/Timelapse';
import { FilePaper2 } from '@styled-icons/remix-fill/FilePaper2';

//Icons:
const AddIcon = styled(Add)`
    color: #ffffff;
    height: 1.5rem;
    width: 1.5rem;
`;

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
    margin-top: 20%;
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
`;

const PathwayText = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1.2em;
    font-weight: 700;
    color: #423c3c;
`;

//Interface:

const MainNotebook = () => {
    return (
        <MainContainer>
            <Sidebar>
                <AddButtonContainer>
                    <GeneralButton
                        buttonLabel="Add New"
                        buttonIcon={<AddIcon />}
                        fontSize="1em"
                    />
                </AddButtonContainer>
                <FileOptions>
                    <GeneralButton
                        buttonLabel="Starred"
                        buttonIcon={<StarIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Shared"
                        buttonIcon={<UsersIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Recent"
                        buttonIcon={<TimelapseIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                    />
                    <FileOptionSpacer />
                    <GeneralButton
                        buttonLabel="Suggested"
                        buttonIcon={<FileIcon />}
                        disableShadow={true}
                        buttonTextColor="#3C4042"
                        buttonBackground="transparent"
                        iconMargin="2rem"
                    />
                </FileOptions>
            </Sidebar>
            <FileContainer>
                <PathwayContainer>
                    <PathwayText>Path: // Root</PathwayText>
                </PathwayContainer>
                Files
            </FileContainer>
        </MainContainer>
    );
};

export default MainNotebook;
