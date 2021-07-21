import React from 'react';
import { Menu, Item, Separator, theme, animation } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

//Styles:

//Interfaces:

interface ContextMenuProps {
    id: string | number;
}

const ContextMenu = ({ id }: ContextMenuProps): JSX.Element => {
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

export default ContextMenu;
