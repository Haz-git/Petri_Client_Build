import React from 'react';
import styled from 'styled-components';

//Styles:
const MainContainer = styled.div`
    /* min-height: 100%; */
    height: 100vh;
    display: grid;
    grid-template-columns: 20% 80%;
`;

const Sidebar = styled.div`
    text-align: center;
    border: 1px solid black;
    padding: 1rem 1rem;
`;

const FileContainer = styled.div`
    border: 1px solid black;
    text-align: left;
`;

const PathwayContainer = styled.div``;

//Interface:

const MainNotebook = () => {
    return (
        <MainContainer>
            <Sidebar>This is a sidebar</Sidebar>
            <FileContainer>
                <PathwayContainer>Path: // Root</PathwayContainer>Files
            </FileContainer>
        </MainContainer>
    );
};

export default MainNotebook;
