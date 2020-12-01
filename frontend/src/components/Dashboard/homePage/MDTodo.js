import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addNewTask, getTasks } from '../../../redux/userTaskLog/userTaskLogActions';
import TaskCard from './TaskCard';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

//Styles:
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export const StyledHeader = styled.h2`
    font-family: 'Nunito', sans-serif;
    font-size: 25px;
    margin: 0;
    background-color:#242746;
    color: white;
    padding: 10px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    -webkit-box-shadow: 0 -2px 5px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 -2px 5px rgba(0,0,0,0.3);
    box-shadow: 0 -2px 5px rgba(0,0,0,0.3);

`

export const MainTodoContainer = styled.div`
    padding: 20px 20px;
    background-color: white;
    border: none;
    height: 400px;
    width: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    -webkit-box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 3px 5px rgba(0,0,0,0.3);
    box-shadow: 0 3px 5px rgba(0,0,0,0.3);
`

const TaskRenderContainer = styled.div`
    height: 290px;
    overflow-y: scroll;
`


//Render:
const MDTodo = ({ addNewTask, getTasks, taskList }) => {

    const [task, setTask] = useState('');

    useEffect(() => {
        getTasks();
    },[])

    const handleSubmit = e => {
        e.preventDefault();

        if(task.trim() === '') {
            alert('Please enter a value');
        } else {
            addNewTask(task);
            setTask('');
        }
    }

    const handleChange = e => {
        e.preventDefault();
        setTask(e.target.value);
    }

    const renderTasks = () => (
        taskList.map(task => (
            <TaskCard key={uuid()} item={task} />
        ))
    )

    return (
        <>
            <StyledHeader>Daily Task Log</StyledHeader>
            <MainTodoContainer>
                <div>
                    <form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add new task"
                                aria-label="Add new task"
                                aria-describedby="basic-addon2"
                                type="text"
                                value={task}
                                autoComplete='off'
                                onChange={handleChange}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type='submit'>Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </form>
                </div>
                <TaskRenderContainer>
                    {renderTasks()}
                </TaskRenderContainer>
            </MainTodoContainer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        taskList: state.task.Tasks,
    }
}

export default connect(mapStateToProps, { addNewTask, getTasks })(MDTodo);