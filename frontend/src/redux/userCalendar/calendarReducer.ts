import { CalendarActionType } from './action-types';
import { CalendarAction } from './calendarInterfaces';

const initialState = {};

export default (state: Object = initialState, action: CalendarAction) => {
    switch (action.type) {
        case CalendarActionType.USER_ADD_EVENT:
            return { ...state, calendarEvents: action.payload };
        case CalendarActionType.USER_GET_EVENTS:
            return { ...state, calendarEvents: action.payload };
        case CalendarActionType.USER_UPDATE_EVENT:
            return { ...state, calendarEvents: action.payload };
        case CalendarActionType.USER_DELETE_EVENT:
            return { ...state, calendarEvents: action.payload };
        default:
            return state;
    }
};
