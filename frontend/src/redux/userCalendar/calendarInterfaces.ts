import { CalendarActionType } from './action-types';

export interface IAddEvent {
    type: CalendarActionType.USER_ADD_EVENT;
    payload?: any;
}

export interface IUpdateEvent {
    type: CalendarActionType.USER_UPDATE_EVENT;
    payload?: any;
}

export interface IDeleteEvent {
    type: CalendarActionType.USER_DELETE_EVENT;
    payload?: any;
}

export interface IGetEvent {
    type: CalendarActionType.USER_GET_EVENTS;
    payload?: any;
}

export type CalendarAction =
    | IAddEvent
    | IUpdateEvent
    | IDeleteEvent
    | IGetEvent;
