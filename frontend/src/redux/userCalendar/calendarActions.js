import api from '../../api';
import {
    USER_ADD_EVENT,
    USER_GET_EVENTS,
    USER_UPDATE_EVENT,
    USER_DELETE_EVENT,
} from './calendarTypes';

export function addNewEvent(event) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/calendar/new', { _id, event });

        dispatch({
            type: USER_ADD_EVENT,
            payload: response.data.userNewCalendarEvents,
        });
    }
}

export function getEvents() {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/calendar/events', { _id });

        dispatch({
            type: USER_GET_EVENTS,
            payload: response.data.existingUserCalendarEvents
        });
    }
}

export function deleteEvent(event) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.post('/users/calendar/delete', { event, _id });

        console.log(response);

        dispatch({
            type: USER_DELETE_EVENT,
            payload: response.data.updatedDeletedCalendarEvents
        });
    }
}

export function updateEvent(event) {
    return async (dispatch, getState) => {
        const { auth: { userLogIn: { data: { _id } } } } = getState();

        const response = await api.patch('/users/calendar/update', { event, _id });

        dispatch({
            type: USER_UPDATE_EVENT,
            payload: response.data.updatedCalendarEvents
        });
    }
}