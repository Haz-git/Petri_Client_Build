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
import CircularProgress from '@material-ui/core/CircularProgress';

const MainMessengerContainer = styled.div`
    margin-left: 0;
    box-sizing: border-box;
    background-color: #f6f9fc;
    max-height: 100vh;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;

`

const MainMessengerHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
`

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: white;
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
    background-color: white;
    overflow-y: scroll;
    padding: 40px 40px;
    overflow-x: hidden;
    max-height: 70vh;
    position: relative;

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

const SpinnerContainer = styled.div`
    padding: 40px 40px;
    text-align: center;
    
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

        this.state = {
            chatMessage: "",
            loading: null,
        }
    }

    componentDidMount() {
        // let server = 'https://petri-webapp-heroku.herokuapp.com';
        let server = 'http://localhost:8080';

        //Gather all stored chat messages:

        //Connecting Socket to Server:
        this.socket = io(server);
        this.socket.on('Output Chat Message', msg => {
            //We need to create another action creator to dispatch an 'updated state' when receiving new messages from backend:
            this.props.updateStateAfterNewMessage(msg);
        })

        this.socket.open();

        //Conditional render for loading spinner: Set state to true for loading and initialize callback function.

        this.setState({ loading: true }, () => {
            this.props.restoreChats()
                .then(result => {
                    // const chatLogs = this.props.chat;

                    this.setState({
                        loading: result,
                        // chatLogs: chatLogs,
                    })
                })
        })
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

    componentDidUpdate = () => {
        if (this.state.loading === false) {
            this.messageEnd.scrollIntoView({behavior: 'smooth'});
        }
    }
    

    handleChatSubmit = e => {
        e.preventDefault();

        //We need to put chat message into server:
        if (this.state.chatMessage.trim() !== '') {
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
    }


    renderChatContainer = () => {
        if (this.state.loading === false) {
            return (
                <>
                    <ChatContainer>
                        {this.props.chat && ( <div>{this.renderCards()}</div>)}
                        <div ref={el => {this.messageEnd = el;}} />
                    </ChatContainer>
                </>
            )
        } else {
            return (
                <>
                    <SpinnerContainer>
                        <CircularProgress />
                    </SpinnerContainer>
                </>
            )
        }
    }


    render() {

        return (
            <>
                <MainMessengerHeaderContainer>
                    <Fade>
                    <StyledMainHeader>The Petri Dish</StyledMainHeader>
                    </Fade>
                </MainMessengerHeaderContainer>
                <MainMessengerContainer>
                    <NestedMessengerContainer>
                        <div>
                            {this.renderChatContainer()}
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
        user: state.userSettings.userSettings,
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
