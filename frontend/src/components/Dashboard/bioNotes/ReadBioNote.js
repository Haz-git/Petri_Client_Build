import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HTMLparse from 'html-react-parser';
import { unescape } from 'html-escaper';

//CSS Styling:
import { Button } from 'react-bootstrap';
import { ArrowLeftSquare } from '@styled-icons/bootstrap/ArrowLeftSquare';


const MainContainer = styled.div`
    padding: 40px 40px;
`

const NameContainer = styled.div`
    margin-top: 40px;
    text-align: center;
    background-color: #242746;
    color: white;
    padding: 10px 10px;
`
const NameHeader = styled.h1`
    font-family: 'Ubuntu', 'Open Sans', sans-serif;
    font-size: 40px;
    font-weight: 300;
    margin: 0;
`

const EditorReadContainer = styled.div`
    padding: 10px 10px;
    border: 1px solid #242746;
    background-color: white;
    overflow-y: auto;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 5px rgba(0, 0, 0, 0.06),
        0 22.3px 10px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 80px rgba(0, 0, 0, 0.12);
    ;
`

const ArrowIcon = styled(ArrowLeftSquare)`
    height: 21px;
    width: 21px;
    margin-right: 7px;
    vertical-align: sub;
`




const ReadBioNote = ({ match:{params:{id}}, bionotes }) => {
    
    const [ escapedHTMLState, setEscapedHTMLState ] = useState('');
    const [ formattedHTML, setFormattedHTML ] = useState('');
    const [ bionoteName, setBionoteName ] = useState('');

    useEffect(() => {
        renderBioNote();
    },[]);


    const renderBioNote = () => {
        const currentNote = bionotes.bionotes.find(x => x.bionote_ID === id);
        setBionoteName(currentNote.bioName)


        const fixedHTML = unescape(currentNote.htmlState);
        setFormattedHTML(fixedHTML)

    }

    //Loaded CK's css style import from CDN and inputted className 'ck-content' in order for images to load properly in the correct format.
    
    return (
        <>
            <MainContainer>
                <Link to={`/createbionote`}>
                    <Button size='lg' variant='dark'>
                        <ArrowIcon />
                        Return 
                    </Button>
                </Link>
                <NameContainer>
                    <NameHeader>{bionoteName}</NameHeader>
                </NameContainer>
                <EditorReadContainer className="ck-content">
                    {HTMLparse(formattedHTML)}
                </EditorReadContainer>
            </MainContainer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        bionotes: state.bionotes,
    }
}

export default connect(mapStateToProps)(ReadBioNote);
