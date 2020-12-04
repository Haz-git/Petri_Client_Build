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

import { PaperPlane } from '@styled-icons/boxicons-solid/PaperPlane';
import Fade from 'react-reveal/Fade';

const MainMessengerContainer = styled.div`
    margin-left: 0;
    box-sizing: border-box;
    background-color: #f6f9fc;
    height: 100vh;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;

`

const HeaderContainer = styled.div`
    text-align: center;
`
const MainHeaderText = styled.h1`
    margin: 0;
    font-weight: 900;
    font-size: 60px;
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;
    color: #293241;
    font-family: 'Catamaran', sans-serif;

`
const NestedMessengerContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: white;
    padding: 10px 10px;
    border: none;
    border-radius: 9px;
    box-shadow:
        0 2.8px 20px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
    
`

const ChatContainer = styled.div`
    height: 1000px;
    background-color: white;
    overflow-y: scroll;
    padding: 40px 40px;

    @media (max-height: 1000px) {
        height: 750px;
    }

    @media (max-height: 900px) {
        height: 650px;
    }

    @media (max-height: 800px) {
        height: 550px;
    }
`

const InputContainer = styled.div`
    padding: 40px 40px;
    background-color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const StyledInput = styled.input`
    width: 600px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid white;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    background-color: #293241;
    color: white;
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
    background-color: #293241;
    color: white;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    &:focus {
        outline: none;
    }
`

const StyledForm = styled.form`
    display: flex;
    align-items: center;
`

const StyledPaperPlane = styled(PaperPlane)`
    width: 30px;
    height: 30px;
`


//Render:

class Messenger extends Component {
    constructor(props) {
        super(props)

        this.props.restoreChats();

        this.state = {
            chatMessage: "",
        }
    }

    componentDidMount() {
        let server = 'https://petri-webapp-heroku.herokuapp.com';

        //Gather all stored chat messages:

        //Connecting Socket to Server:
        this.socket = io(server);
        this.socket.on('Output Chat Message', msg => {
            //We need to create another action creator to dispatch an 'updated state' when receiving new messages from backend:
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
            <Fade>
                <ChatCard key={uuid()} {...chat}/>
            </Fade>
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
                    <HeaderContainer>
                        <MainHeaderText>The Petri Dish</MainHeaderText>
                    </HeaderContainer>
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
                            <StyledForm onSubmit={this.handleChatSubmit} autoComplete='off'>
                                <StyledInput
                                    id='message'
                                    placeholder='Start Chatting!'
                                    type='text'
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />
                                <StyledButton type='submit'>
                                    <StyledPaperPlane />
                                </StyledButton>
                            </StyledForm>
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
