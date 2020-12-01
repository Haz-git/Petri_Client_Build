import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import { restoreChats, updateStateAfterNewMessage } from '../../../redux/chatMessaging/chatActions';
import ChatCard from './ChatCard.js';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import 'normalize.css';

//Styles:

const MainMessengerContainer = styled.div`
    margin-left: 0;
    box-sizing: border-box;
    background-color: #f6f9fc;
    height: 100vh;

`
const MainHeaderText = styled.h1`
    margin: 0;
    padding: 10px 10px;
    text-align: center;
    font-family: Roboto, sans-serif;
    color: #747fe0;

`
const NestedMessengerContainer = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    background-color: #e5f1fc;
    box-shadow: 0 1px 2px rgba(0, 0, 0,0.07), 0 1px 1px rgba(0,0,0.07);
`

const ChatContainer = styled.div`
    margin-left: 20px;
    height: 600px;
    background-color: #e5f1fc;
    overflow-y: scroll;
`

const InputContainer = styled.div`
    padding: 40px 40px;
    background-color: #e5f1fc;
    text-align: center;
`
const StyledInput = styled.input`
    width: 600px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    &:focus {
        outline: none;
    }
`

const StyledButton = styled.button`
    cursor: pointer;
    height: 38px;
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    background-color: #35bdb2;
    color: white;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    &:focus {
        outline: none;
    }
`


//Render:

class Messenger extends Component {
    constructor(props) {
        super(props)
        console.log('constructor running');

        this.props.restoreChats();

        this.state = {
            chatMessage: "",
        }
    }

    componentDidMount() {
        let server = 'http://localhost:8080';
        console.log('Component mounted');

        //Gather all stored chat messages:

        //Connecting Socket to Server:
        this.socket = io(server);
        this.socket.on('Output Chat Message', msg => {
            //We need to create another action creator to dispatch an 'updated state' when receiving new messages from backend:
            console.log('Socket Created');
            console.log(msg);
            this.props.updateStateAfterNewMessage(msg);
        })

        this.socket.open();
    }

    componentDidUpdate = () => {
        this.messageEnd.scrollIntoView({behavior: 'smooth'});
    }

    componentWillUnmount = () => {
        //Prevent multiple sockets from opening per re-render
        this.socket.close();
    }

    handleSearchChange = e => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () => (
        //Changing key from chat._id to uuid to prevent occasional duplication:
        this.props.chat.map((chat) => (
            <ChatCard key={uuid()} {...chat}/>
        ))
    )
    

    handleChatSubmit = e => {
        e.preventDefault();

        //We need to put chat message into server:
        let chatMessage = this.state.chatMessage;

        let userId = this.props.user._id;
        let userName = this.props.user.userName;
        let currentTime = moment();
        let type = 'Text';

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            currentTime,
            type,
        });

        //Reset State:

        this.setState({
            chatMessage: ''
        });
    }

    render() {
        return(
            <>
                <MainMessengerContainer>
                    <MainHeaderText>Global Chat</MainHeaderText>
                    <NestedMessengerContainer>
                        <div>
                            <ChatContainer>
                                {this.props.chat && (
                                    <div>{this.renderCards()}</div>
                                )}
                                <div
                                    ref={el => {this.messageEnd = el;}}
                                />
                            </ChatContainer>
                        </div>
                        <InputContainer>
                            <form onSubmit={this.handleChatSubmit} autoComplete='off'>
                                <StyledInput
                                    id='message'
                                    placeholder='Start Chatting!'
                                    type='text'
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />
                                <StyledButton type='submit'>Submit</StyledButton>
                            </form>
                        </InputContainer>
                    </NestedMessengerContainer>
                </MainMessengerContainer>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.userLogIn.data,
        chat: state.chat.chatLogs,
    }
}

const mapDispatchToProps = () => {
    return {
        restoreChats,
        updateStateAfterNewMessage,
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Messenger);
