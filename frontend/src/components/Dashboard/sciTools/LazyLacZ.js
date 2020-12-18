import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addNewProtocols, getProtocols } from '../../../redux/userLacZ/LacZActions';
import ProtocolCard from './ProtocolCard';

//Styles:
import { MainHeader, SecondaryHeader } from '../../signupPage/SignUpForm';

const MainContainer = styled.div`
    text-align: center;
    padding: 20px 20px;
    background-color: ${props => props.theme.lacZMainContainerBG};
    height: 100vh;

`

const StyledMainHeader = styled(MainHeader)`
    font-family: 'Nunito', Arial, Helvetica, sans-serif;
    color: ${props => props.theme.lacZMainHeaderBG};
    font-weight: 400;
`

const StyledSecondaryHeader = styled(SecondaryHeader)`
    color: ${props => props.theme.lacZSecondaryHeaderBG};
`

const InputContainer = styled.div`
    display: flex;
    padding: 20px 20px;
    align-items: center;
    justify-content: center;
`

export const StyledInput = styled.input`
    width: 500px;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: ${props => props.theme.lacZStyledInputBorder};
    color: ${props => props.theme.lacZStyledInputC};
    background-color: ${props => props.theme.lacZStyledInputBG};
    border-radius: 6px;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
`

const StyledButton = styled.button`
    display: inline-block;
    padding: .75rem 1.25rem;
    border-radius: 5px;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    margin-left: 20px;
    margin-right: 20px;
    border: none;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: rgb(5, 145, 62);
        transition: all .3s;
        border-radius: 5px;
        z-index: -1;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 121, 49);
        border-radius: 5px;
        z-index: -2;
    }

    &:hover {
        color: #fff;
    }

    &:hover::before {
        width: 100%;
    }
`


const LazyLacZ = ({ addNewProtocols, getProtocols, laczAssayProtocols }) => {

    const [ protocolInput, setProtocolInput ] = useState('');

    useEffect(() => {
        getProtocols();
    },[])

    const handleProtocolSubmit = (e) => {
        e.preventDefault();

        if(protocolInput.trim() === '') {
            alert('Please Enter A Value...')
        } else {
            addNewProtocols(protocolInput);
            setProtocolInput('')
        }
    }

    const handleInputChange = (e) => {
        setProtocolInput(e.target.value);
    }

    const renderProtocols = () => {
        if (laczAssayProtocols !== undefined && laczAssayProtocols !== null) {

            return (
                laczAssayProtocols.map(protocol => (
                    <ProtocolCard 
                        name={protocol.protocolName} 
                        collection={protocol.collection}
                        lacZ={protocol.lacZ}
                        protocolId={protocol.protocolId}
                        key={protocol.protocolId}
                        timeStamp={protocol.timeStamp}
                    />
                ))
            )
            
        } else {
            return null;
        }
    }


    return (
        <>
            <MainContainer>
                <StyledMainHeader>LacZ Assay</StyledMainHeader>
                <div>
                    <StyledSecondaryHeader>Protocol List</StyledSecondaryHeader>
                    <form onSubmit={handleProtocolSubmit}>
                        <InputContainer>
                            <div>
                                <StyledInput 
                                    onChange={handleInputChange} 
                                    placeholder='Add new protocols...'
                                    type='text'
                                    value={protocolInput}
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <StyledButton type='submit'>
                                    Add
                                </StyledButton>
                            </div>
                        </InputContainer>
                    </form>
                    <div>
                        {renderProtocols()}
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

/*Todo::
1. Finish AddNewStrain and getAllStrain Controller functions in backend;
2. Render Strains added to frontend via mapStateToProps
3. These rendered Strains should have two buttons: Collection | LacZ 
^^^This is done.
3.5. I need to add an edit and delete button for the strain name and entire strain..
4. Maybe have a router route these buttons with the unique id of the strain sent from mongodb.
^^^This means that we'll have a separate component for collection and lacZ, where the URL has mongo's unique_id where whatever we add we can use to search and update the strain in mongo.
5. Of course, after the CRUD operations are all done we can then search for graphing packages to display a graph....and a way to save it (push to google drive? Download as pdf?)

*/
const mapStateToProps = state => {
    return {
        laczAssayProtocols: state.laczAssayProtocols.laczProtocol
    }
}



export default connect(mapStateToProps, { addNewProtocols, getProtocols })(LazyLacZ);