import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';



const Button = styled.button`
    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.text};
    border-radius: 30px;
    cursor: pointer;
    font-size:0.8rem;
    padding: 0.6rem;
`


const Toggle = ({ theme,  toggleTheme, callBack }) => {

    //Inputting callback function supplied by App parent component in order to change theme from settings.
    return (
        <Button onClick={() => toggleTheme(callBack) } >
            Switch Theme
        </Button>
    );
};


Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}


export default Toggle;
