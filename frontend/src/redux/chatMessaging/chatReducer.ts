import { ChatAction } from './chatInterfaces';
import { ChatActionType } from './action-types';

const initialState = {};

export default (state: Object = initialState, action: ChatAction) => {
    switch (action.type) {
        case ChatActionType.USER_CHAT_REQUEST:
            return { ...state, chatLogs: action.payload };
        case ChatActionType.USER_CHAT_RECEIVED:
            return { ...state, chatLogs: action.payload };
        default:
            return state;
    }
};
