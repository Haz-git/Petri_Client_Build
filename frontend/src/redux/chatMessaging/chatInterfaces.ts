import { ChatActionType } from './action-types';

export interface IRestoreChat {
    type: ChatActionType.USER_CHAT_REQUEST;
    payload?: any;
}

export interface IChatRecieved {
    type: ChatActionType.USER_CHAT_RECEIVED;
    payload?: any;
}

export type ChatAction = IRestoreChat | IChatRecieved;
