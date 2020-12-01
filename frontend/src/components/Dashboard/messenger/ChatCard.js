import React from 'react'

const ChatCard = (props) => {
    return (
        <div>
            <div>
                <h2>{props.sender.userName}</h2>
                <h3>{props.sender.createdAt}</h3>
            </div>
            <div>{props.message}</div>
        </div>
    )
}

export default ChatCard;
