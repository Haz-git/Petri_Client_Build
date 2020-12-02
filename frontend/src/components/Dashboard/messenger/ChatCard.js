import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

//Styles:

const MainChatCardContainer = styled.div`
    margin-top: 18px;
    margin-bottom: 18px;
`

const ChatCardHeader = styled.div`
    display: flex;
    align-items: center;
`

const NameTag = styled.h2`
    font-family: 'Montserrat', sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: #293241;
`

const TimeTag = styled.h2`
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 200;
    color: #949494;
    padding-left: 10px;
`
const MessageContainer = styled.div`
    border: 1px solid gray;
    width: fit-content;
    color: white;
    background-color: #293241;
    padding: 5px 20px;
    border-radius: 5px;
    margin: 0;
`


//Render:

const ChatCard = (props) => {

    console.log(props);

    return (
        <MainChatCardContainer>
            <ChatCardHeader>
                <NameTag>{props.sender.userName}</NameTag>
                <TimeTag>@ {moment(props.createdAt).format('HH:mm a')}</TimeTag>
            </ChatCardHeader>
            <MessageContainer>{props.message}</MessageContainer>
        </MainChatCardContainer>
    )
}

export default ChatCard;