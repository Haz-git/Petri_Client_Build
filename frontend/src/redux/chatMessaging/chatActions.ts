import api from '../../api';
import { Dispatch } from 'redux';
import { ChatActionType } from './action-types';
import { ChatAction } from './chatInterfaces';

interface State {
    chat: any;
}

export function restoreChats() {
    return async (dispatch: Dispatch<ChatAction>) => {
        const response = await api.get(`/users/chats`);

        if (response) {
            dispatch({
                type: ChatActionType.USER_CHAT_REQUEST,
                payload: response.data.data.chats,
            });
        } else {
            return null;
        }

        //Flag for messenger loading:
        return false;
    };
}

export function updateStateAfterNewMessage(data: any) {
    return (dispatch: Dispatch<ChatAction>, getState: () => State) => {
        const { chat } = getState();

        let newChatLog = [...chat.chatLogs];

        newChatLog = newChatLog.concat(data);

        dispatch({
            type: ChatActionType.USER_CHAT_RECEIVED,
            payload: newChatLog,
        });
    };
}
