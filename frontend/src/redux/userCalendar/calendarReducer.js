import {
    USER_ADD_EVENT,
    USER_GET_EVENTS,
    USER_UPDATE_EVENT,
    USER_DELETE_EVENT,
} from './calendarTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_ADD_EVENT:
            return {...state, calendarEvents: action.payload};
        case USER_GET_EVENTS:
            return {...state, calendarEvents: action.payload};
        case USER_UPDATE_EVENT:
            return {...state, calendarEvents: action.payload};
        case USER_DELETE_EVENT:
            return {...state, calendarEvents: action.payload};
        default:
            return state;
    }
}