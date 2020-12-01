import api from '../../api';
import { USER_CHAT_REQUEST, USER_CHAT_RECEIVED } from './chatTypes';

export function restoreChats() {
    return async dispatch => {

        const response = await api.get(`/users/chats`);

        if (response) {
            dispatch({
                type: USER_CHAT_REQUEST,
                payload: response.data.data.chats
            });
        } else {
            return null;
        }
    }
}


export function updateStateAfterNewMessage(data) {
    return (dispatch, getState) => {
        const { chat } = getState();

        let newChatLog = [...chat.chatLogs];

        newChatLog = newChatLog.concat(data);

        dispatch({
            type: USER_CHAT_RECEIVED,
            payload: newChatLog,
        });
    }
}