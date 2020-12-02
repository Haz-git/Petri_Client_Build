import React from 'react';

const ChatCard = (props) => {

    const renderNames = () => {
        if(props.sender.userName !== null && props.sender.userName !== undefined) {
            return props.sender.userName
        } else {
            return (
                'Deleted User'
            )
        }
    }


    return (
        <div>
            <div>
                <h2>{renderNames()}</h2>
                <h3>{props.sender.createdAt}</h3>
            </div>
            <div>{props.message}</div>
        </div>
    )
}

export default ChatCard;
