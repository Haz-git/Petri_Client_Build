import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
    headerTitle: string;
}

const PageHeader = ({ headerTitle }: PageHeaderProps): JSX.Element => {
    return <div>{headerTitle}</div>;
};

export default PageHeader;
