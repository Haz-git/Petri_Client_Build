import React, { useState } from 'react';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
import { AddCircle } from '@styled-icons/ionicons-solid/AddCircle';
import { MagnifyingGlass } from '@styled-icons/foundation/MagnifyingGlass'
import { Edit } from '@styled-icons/material/Edit';
import { DeleteForever } from '@styled-icons/material/DeleteForever';

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const MainCardContainer = styled.div`
    background-color: white;
    border: none;
    border-radius: 5px;
    width: 100%;
    max-width: 800px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
;
`
const HeaderContainer = styled.div`
    display: block;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const StyledButton = styled.button`
    padding: 5px 5px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: rgba(6, 53, 95);
    color: whitesmoke;
    border: none;
    border-radius: 5px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: rgba(6, 65, 117);
    }
`

const StyledEditButton = styled(StyledButton)`
    background-color: rgb(0, 102, 0);
    margin-bottom: 1px;
    &:hover {
        background-color: rgba(0, 118, 0);
        text-decoration: none;
    }


`
const StyledDeleteButton = styled(StyledButton)`
    background-color: rgb(127, 3, 0);
    margin-bottom: 1px;
    &:hover {
        background-color: rgba(148, 0, 0);
    }
`

const StyledSpan = styled.span`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const StyledCircle = styled(AddCircle)`
    width: 20px;
    margin-right: 2px;
`
const StyledMGlass = styled(MagnifyingGlass)`
    width: 20px;
    margin-right: 2px;
`
const StyledEditIcon = styled(Edit)`
    width: 20px;
    margin-right: 2px;
`
const StyledDeleteIcon = styled(DeleteForever)`
    width: 20px;
    margin-right: 2px;
`

const TimeStampDesc = styled.h3`
    position: absolute;
    margin: 0;
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    text-align: left;
`


const StyledCardHeader = styled.h2`
    margin: 0;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #293241;
    text-align: left;
    margin-bottom: 2px;
`

//Render:

const ProtocolCard = ({ protocolId, name, collection, lacZ, timeStamp }) => {

    const [ renderModal, setRenderModal ] = useState(false);
    const [ renderDeleteModal, setRenderDeleteModal ] = useState(false);

    const renderCallBack = (boolean) => {
        //Callback function for handling same state as edit modal..
        setRenderModal(boolean);
    }

    const renderDeleteCallBack = boolean => {
        setRenderDeleteModal(boolean);
    }


    const handleEditProtocolName = (e) => {
        e.preventDefault();
        //Turns on modal and registers user input as new input name.
        setRenderModal(true);
    }


    const handleDeleteProtocol = (e) => {
        e.preventDefault();
        //Opens delete modal:

        setRenderDeleteModal(true);
    }

    const renderCard = () => { 
        if (collection && lacZ) {
            return (
                <>
                    <MainCardContainer>
                        <HeaderContainer>
                            <StyledCardHeader>{name}</StyledCardHeader>
                            <TimeStampDesc>{timeStamp}</TimeStampDesc>
                        </HeaderContainer>
                        <ButtonContainer>
                            <StyledEditButton onClick={handleEditProtocolName}>
                                <StyledSpan>
                                    <StyledEditIcon />
                                    Edit
                                </StyledSpan>
                            </StyledEditButton>
                            <StyledDeleteButton onClick={handleDeleteProtocol}>
                                <StyledSpan>
                                    <StyledDeleteIcon />
                                    Delete
                                </StyledSpan>
                            </StyledDeleteButton>
                            <Link to={`/scitools/lazylacz/collection/${protocolId}`}>
                                <StyledButton>
                                    <StyledSpan>
                                        <StyledMGlass />
                                        Collection
                                    </StyledSpan>
                                </StyledButton>
                            </Link>
                            <Link to={`/scitools/lazylacz/lacz/${protocolId}`}>
                                <StyledButton>
                                    <StyledSpan>
                                        <StyledMGlass />
                                        LacZ
                                    </StyledSpan>
                                </StyledButton>
                            </Link>
                        </ButtonContainer>
                    </MainCardContainer>
                    <EditModal
                        renderProp={renderModal}
                        protocolName={name}
                        renderCallBack={renderCallBack}
                        protocolId={protocolId}
                    />
                    <DeleteModal
                        renderProp={renderDeleteModal}
                        protocolName={name}
                        renderCallBack={renderDeleteCallBack}
                        protocolId={protocolId}
                    />
                </>
            )
        } else {
            return (
                <>
                    <MainCardContainer>
                        <HeaderContainer>
                        <StyledCardHeader>{name}</StyledCardHeader>
                        <TimeStampDesc>{timeStamp}</TimeStampDesc>
                        </HeaderContainer>
                        <ButtonContainer>
                            <StyledEditButton onClick={handleEditProtocolName}>
                                <StyledSpan>
                                    <StyledEditIcon />
                                    Edit
                                </StyledSpan>
                            </StyledEditButton>
                            <StyledDeleteButton onClick={handleDeleteProtocol}>
                                <StyledSpan>
                                    <StyledDeleteIcon />
                                    Delete
                                </StyledSpan>
                            </StyledDeleteButton>
                            <Link to={`/scitools/lazylacz/collection/${protocolId}`}>
                                <StyledButton>
                                    <StyledSpan>
                                        <StyledCircle />
                                        Collection
                                    </StyledSpan>
                                </StyledButton>
                            </Link>
                            <Link to={`/scitools/lazylacz/lacz/${protocolId}`}>
                                <StyledButton>
                                    <StyledSpan>
                                        <StyledCircle />
                                        LacZ
                                    </StyledSpan>
                                </StyledButton>
                            </Link>
                        </ButtonContainer>
                    </MainCardContainer>
                    <EditModal
                        renderProp={renderModal}
                        protocolName={name}
                        renderCallBack={renderCallBack}
                        protocolId={protocolId}
                    />
                    <DeleteModal
                        renderProp={renderDeleteModal}
                        protocolName={name}
                        renderCallBack={renderDeleteCallBack}
                        protocolId={protocolId}
                    />
                </>
            )
        }
    }

    return (
        <MainContainer>
            {renderCard()}
        </MainContainer>
    )
}

export default ProtocolCard;
