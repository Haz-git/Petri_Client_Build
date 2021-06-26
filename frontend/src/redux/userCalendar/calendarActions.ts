import api from '../../api/index';
import { Dispatch } from 'redux';
import { CalendarActionType } from './action-types';
import { CalendarAction } from './calendarInterfaces';
interface State {
    //Indexable Type:
    auth: {
        userLogIn: {
            data: {
                _id: String;
            };
        };
    };
}

export function addNewEvent(event: any) {
    return async (
        dispatch: Dispatch<CalendarAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/calendar/new', { _id, event });

        //The following state dispatches are commented out due to fullcalendar's state conflicting with the redux state. Not dispatching a new state to re-render the fullCalendar component prevents an additional render, therefore preventing showing a user's dragged events twice.

        // dispatch({
        //     type: USER_ADD_EVENT,
        //     payload: response.data.userNewCalendarEvents,
        // });
    };
}

export function getEvents() {
    return async (
        dispatch: Dispatch<CalendarAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/calendar/events', { _id });

        dispatch({
            type: CalendarActionType.USER_GET_EVENTS,
            payload: response.data.existingUserCalendarEvents,
        });

        //Returning flag for loading finish:
        return false;
    };
}

export function deleteEvent(event: any) {
    return async (
        dispatch: Dispatch<CalendarAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.post('/users/calendar/delete', {
            event,
            _id,
        });

        // dispatch({
        //     type: USER_DELETE_EVENT,
        //     payload: response.data.updatedDeletedCalendarEvents
        // });
    };
}

export function updateEvent(event: any) {
    return async (
        dispatch: Dispatch<CalendarAction>,
        getState: () => State
    ) => {
        const {
            auth: {
                userLogIn: {
                    data: { _id },
                },
            },
        } = getState();

        const response = await api.patch('/users/calendar/update', {
            event,
            _id,
        });

        //This dispatch is commented out for the same reason above.

        // dispatch({
        //     type: USER_UPDATE_EVENT,
        //     payload: response.data.updatedCalendarEvents
        // });
    };
}
