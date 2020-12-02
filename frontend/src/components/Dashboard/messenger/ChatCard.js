import React from 'react';

const ChatCard = (props) => {

    const renderNames = () => {
        if(props.sender.userName !== null && props.sender.userName !== undefined) {
            return <h2>{props.sender.userName}</h2>
        } else {
            return <h2>Deleted User</h2>
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
