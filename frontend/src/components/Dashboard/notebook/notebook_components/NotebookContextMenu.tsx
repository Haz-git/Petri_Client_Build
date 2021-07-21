import React from 'react';
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import styled from 'styled-components';
import 'react-contexify/dist/ReactContexify.css';

//Redux:
import { connect } from 'react-redux';

//Styles:

//Interfaces:

interface ContextMenuProps {
    id: string | number;
}

const NotebookContextMenu = ({ id }: ContextMenuProps): JSX.Element => {
    return (
        <Menu id={id} theme={theme.light} animation={animation.fade}>
            <Item>Item 1</Item>
            <Separator />
            <Item>Item2</Item>
            <Separator />
            <Item>Item3</Item>
        </Menu>
    );
};

export default NotebookContextMenu;
