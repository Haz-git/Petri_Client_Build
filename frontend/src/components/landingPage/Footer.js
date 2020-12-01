import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    background-color: lightcoral;
    text-align: center;
`
// const FooterHeader = styled.h2`

// `

const Footer = () => {
    return (
        <FooterDiv>
            <h2>Test it out! Login or Register!</h2>
        </FooterDiv>
    )
}

export default Footer;