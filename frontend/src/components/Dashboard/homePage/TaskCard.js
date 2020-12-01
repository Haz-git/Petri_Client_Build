import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteTask } from '../../../redux/userTaskLog/userTaskLogActions';
import Card from 'react-bootstrap/Card'

//Icons:
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { Trash } from '@styled-icons/entypo/Trash';
import { Undo } from '@styled-icons/boxicons-regular/Undo';

const MainTaskCardContainer = styled(Card)`
    display: grid;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0;
    grid-template-columns: 80% 20%;

`

const StyledCheckCircle = styled(CheckCircle)`
    color: seagreen;
    height: 25px;
    width: 25px;
`
const StyledTrash = styled(Trash)`
    color: whitesmoke;
    height: 22px; 
    width: 22px;
`

const StyledUndo = styled(Undo)`
    color: #545879;
    height: 25px; 
    width: 25px;
`

const StyledButton = styled.button`
    cursor: pointer;
    border: none;
    border-top-left-radius: none;
    border-bottom-left-radius: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    background-color: #242746;
    outline: none;
    &:focus {
        outline: none;
    }
`
const RenderContainer = styled(Card.Body)`
    display: flex;
    padding: 5px 5px;
    justify-content: space-between;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    color: white;
`
const StyledDeleteButton = styled(StyledButton)`
    border-radius: 0;
    flex-grow: 1;
    background-color:#242746;
`
const StyledResetButton = styled(StyledButton)`
    flex-grow: 1;
    background-color: #242746;
`

const RenderButtonContainer = styled.div`
    display: flex;
`

//Render:

const TaskCard = ({ item, deleteTask }) => {

    const [ status, setStatus ] = useState('incomplete');

    const handleComplete = () => {
        setStatus('complete');
    }

    const handleDelete = () => {
        //item refers to own item
        deleteTask(item);
    }

    const handleRefresh = () => {
        setStatus('incomplete');
    }

    const renderButton = () => {
        if (status === 'incomplete') {
            return (
                <StyledButton onClick={handleComplete}>
                    <StyledCheckCircle />
                </StyledButton>
            )
        } else if (status === 'complete') {
            return (
                <>
                    <RenderButtonContainer>
                        <StyledDeleteButton onClick={handleDelete}>
                            <StyledTrash />
                        </StyledDeleteButton>
                        <StyledResetButton onClick={handleRefresh}>
                            <StyledUndo />
                        </StyledResetButton>
                    </RenderButtonContainer>
                </>
            )
        }
    }

    const renderColor = () => {
        if (status === 'incomplete') {
            return '#943943';
        } else if (status === 'complete') {
            return 'seagreen';
        }
    }

    return (
        <>
            <MainTaskCardContainer>
                <RenderContainer style={{ backgroundColor: `${renderColor()}`}}>
                    {item}
                </RenderContainer>
                {renderButton()}
            </MainTaskCardContainer>
        </>
    )
}

export default connect(null, { deleteTask })(TaskCard);

/* log:11/7 

So now you have a responsive (and quite shitty) button. However, the style can always be improved after. What you need to do now is to:
1. create a deleteTask action creator that will send a POST request with your user ID to mongo
2. Create a deleteTask route in mongo, find the USER document, and delete the task with the same name, and save it. Response should be the updated taskList with the task deleted.
3. Dispatch the updated TaskList with response deleted. Create a case in the reducer and (remember, another action TYPE) to save and change the state.

*/