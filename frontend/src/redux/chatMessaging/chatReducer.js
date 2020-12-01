import { USER_CHAT_RECEIVED, USER_CHAT_REQUEST } from './chatTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_CHAT_REQUEST:
            return {...state, chatLogs: action.payload }
        case USER_CHAT_RECEIVED:
            return {...state, chatLogs: action.payload } //This is working fine...
        default:
            return state;
    }
}