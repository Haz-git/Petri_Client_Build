import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import defaultAvatar from '../../../Img/default_avatar.png';

//Styles:

const MainChatCardContainer = styled.div`
    margin-top: 14px;
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
`

const ChatCardHeader = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    width: fit-content;
    border-radius: 5px;
    position: relative;
    background-color: ${props => props.theme.chatCardBGColor};
    /* -webkit-box-shadow: 1px 1px 6px -2px black;
    -moz-box-shadow: 1px 1px 6px -2px black;
    box-shadow: 1px 1px 6px -2px black;
    border: 1px solid white; */
`

const NameTag = styled.h2`
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.chatCardTextColor};
    margin: 0;
    padding-left: 0px;
`

const TimeTag = styled.h2`
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 200;
    color: #949494;
    padding-left: 8px;
    margin: 0;
`
const ChatContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`


const MessageContainer = styled.div`
    margin-left: 8px;
    width: fit-content;
    max-width: 80vw;
    overflow-wrap: break-word;
    color: ${props => props.theme.chatCardTextColor};
    font-family: 'Nunito', sans-serif;
    -webkit-box-shadow: 0 1px 6px -6px #777;
    -moz-box-shadow: 0 1px 6px -6px #777;
    box-shadow: 0 1px 6px -6px #777;

`

const ChatCardDetails = styled.div`
    display: flex;
    margin-left: 8px;
    align-items: center;
`

const StyledCustomAvatar = styled.img`
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    top: 0px;
    left: 0px;
    border: 2px solid white;
    -webkit-box-shadow: 1px 1px 6px -2px black;
    -moz-box-shadow: 1px 1px 6px -2px black;
    box-shadow: 1px 1px 6px -2px black;
`

const StyledDefaultAvatar = styled.img`
    position: absolute;
    height: 50px;
    width: 50px;
    background-color: white;
    top: 0px;
    left: 0px;
    border-radius: 50%;
    border: 2px solid white;
    -webkit-box-shadow: 1px 1px 6px -2px black;
    -moz-box-shadow: 1px 1px 6px -2px black;
    box-shadow: 1px 1px 6px -2px black;
    
`
const HelperSpan = styled.span`
    display: inline-block;
    vertical-align: middle;
    height: 100%;
`

const ProfilePicture = styled.div`
    height: 50px;
    width: 50px;
`


//Render:

const ChatCard = (props) => {

    const renderProfilePicture = () => {

        if (props.sender.profileImg !== undefined && props.sender.profileImg !== null) {

            const { url } = props.sender.profileImg;

            return (
                <>
                    <HelperSpan /><StyledCustomAvatar src={url} />
                </>
            )
        } else {
            return (
                <>
                    <HelperSpan /><StyledDefaultAvatar src={defaultAvatar} />
                </>
            )
        }
    }

    return (
        <MainChatCardContainer>
            <ChatCardHeader>
                <ProfilePicture>{ renderProfilePicture() }</ProfilePicture>
                <ChatContentContainer>
                    <ChatCardDetails>
                        <NameTag>{props.sender.userName}</NameTag>
                        <TimeTag>{moment(props.createdAt).calendar()}</TimeTag>
                    </ChatCardDetails>
                    <MessageContainer>{props.message}</MessageContainer>
                </ChatContentContainer>
            </ChatCardHeader>
        </MainChatCardContainer>
    )
}

export default ChatCard;