import React from 'react';
import styled from 'styled-components';

//Styles:
const MainHeaderText = styled.h1`
    font-family: 'Lato', sans-serif;
    font-size: 2em;
    font-weight: 800;
    color: ${(props) => props.theme.text};
`;

const HeaderDesc = styled.h2`
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    opacity: 0.7;
`;

const TextSpace = styled.div`
    margin: 0.5em 0;
`;

interface PageHeaderProps {
    headerTitle: string;
    headerDesc?: string;
}

const PageHeader = ({
    headerTitle,
    headerDesc,
}: PageHeaderProps): JSX.Element => {
    return (
        <div>
            <MainHeaderText>{headerTitle}</MainHeaderText>
            <TextSpace />
            <HeaderDesc>{headerDesc}</HeaderDesc>
        </div>
    );
};

export default PageHeader;
