import React, { useState,useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { addNewEvent, getEvents, deleteEvent, updateEvent } from '../../../redux/userCalendar/calendarActions';

import Fade from 'react-reveal/Fade';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Cancel } from '@styled-icons/material-rounded/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';

//Styles:

const MainCalendarHeaderContainer = styled.div`
    padding-left: 40px;
    display: flex;
    text-align: center;
    background-color: #1c1e37;
    height: 85px;
    border-left: 1px solid #F6F9FC;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
`

const StyledMainHeader = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 50px;
    font-weight: 100;
    color: white;
`

const MainCalendarContainer = styled.div`
    display: flex;
    padding: 20px 20px;
`
const SideBarContainer = styled.div`
    flex-grow: .2;
    text-align: center;
    margin: 0;
    padding: 0;
    background-color: #242746;
    margin-right: 20px;
    border-radius: 8px;
    max-height: 800px;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
`

const SideBarHeader = styled.h2`
    color: white;
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 10px 10px;
`

const CalendarContainer = styled.div`
    flex-grow: 3;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 60px 40px rgba(0, 0, 0, 0.12);
`

const InputContainer = styled.div`
    padding: 10px 10px;
`

const StyledCancelIcon = styled(Cancel)`
    height: 20px;
    width: 20px;
    vertical-align: baseline;
`

const StyledDivider = styled.hr`
    background-color: white;
`


const StyledButton = styled(Button)`
    height: 30px;
`

const StyledEventCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: rgb(55, 136, 216);
    border: 1px solid rgb(55, 136, 216);
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-right: 5px;
    max-width: 250px;
    overflow-x: scroll;
`

const SubmittedEventContainer = styled.div`
    padding-left: 15px;
    padding-right: 15px;
`




//Render:

const Calendar = ({ addNewEvent, getEvents, calendarEvents, deleteEvent, updateEvent }) => {

    const calendarComponentRef = React.useRef();

    const [ apiEvents, setApiEvents ] = useState(calendarEvents.calendarEvents)
    const [ currentEvent, setCurrentEvent ] = useState('');
    const [ submittedEvents, setSubmittedEvents ] = useState([]);

    const [ loading, setLoading ] = useState(null);

    useEffect(() => {

        //Set loading state to true on initial render to prime loading flag
        setLoading(true);

        getEvents();
        
        let draggableEl = document.getElementById("external-events");

        new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function(eventEl) {
                let title = eventEl.getAttribute("title");
                let id = eventEl.getAttribute("id");
                return {
                    title,
                    id
                };
            }
        });

    },[])

    useEffect(() => {
        //This useEffect tracks changes to calendarEvents.calendarEvents (when the data comes back from API).

        //On initial render, calendarEvents.calendarEvents is undefined, because it needs to grab data from API.
        setApiEvents(calendarEvents.calendarEvents);

        //This conditional checks for the undefined. If it is, it will render loading spinner. It not, the calendar will render.
        if (calendarEvents.calendarEvents !== undefined) {
            setLoading(false);
        }
    },[calendarEvents.calendarEvents])

    const handleFormChange = e => {
        setCurrentEvent(e.target.value);
    }

    const handleFormSubmit = e => {
        setSubmittedEvents([...submittedEvents, {
            title: currentEvent,
            id: uuid(),
        }]);
        setCurrentEvent('')
    }

    const handleEventClick = clickInfo => {
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' ?`)) {
            deleteEvent(clickInfo.event);
            clickInfo.event.remove();
        }
    }

    const handleEventCardDelete = eventId => {
        setSubmittedEvents(submittedEvents.filter(event => (event.id !== eventId)));
    }

    const handleEventReceive = info => {
        //Only submit the event object to action creator:
        addNewEvent(info.event.toPlainObject());
    }

    const handleEventChange = changeInfo => {
        updateEvent(changeInfo.event.toPlainObject())
            .catch(() => {
                console.log('Something Wonky Happened! Change not reported to API');
                changeInfo.revert()
            })
    }

    const handleKeyPress = e => {
        if (e.charCode === 13) {
            handleFormSubmit();
        }
    }


    const renderSideBar = () => {
        return (
            <SubmittedEventContainer id='external-events'>
                {submittedEvents.map(event => {
                    return (
                        <Fade top>
                            <StyledEventCard
                                className="fc-event"
                                title={event.title}
                                id={event.id}
                                key={event.id}
                            >
                                {event.title}
                                <StyledButton variant='danger' size='sm' onClick={() => handleEventCardDelete(event.id)}>
                                    <StyledCancelIcon />
                                </StyledButton>
                            </StyledEventCard>
                        </Fade>
                    );
                })}
            </SubmittedEventContainer>
        )
    }

    const renderCalendarAfterStateLoad = () => {
        if (loading === true) {
            return (
                <>
                    <CircularProgress />
                </>
            )
        } else {
            return (
                <MainCalendarContainer>
                    <SideBarContainer>
                            <SideBarHeader>Add New Events</SideBarHeader>
                            <InputContainer>
                                <InputGroup className="mb-3" size='sm'>
                                    <FormControl
                                        placeholder="Add new event"
                                        aria-label="Add new event"
                                        aria-describedby="basic-addon2"
                                        type='text'
                                        onChange={handleFormChange}
                                        value={currentEvent}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={handleFormSubmit} size='sm'>Submit</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </InputContainer>                    
                        <StyledDivider />
                        {renderSideBar()}
                    </SideBarContainer>
                    <CalendarContainer>
                        <FullCalendar
                            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
                            ref={calendarComponentRef}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            height='800px'
                            locale='us'
                            initialView='dayGridMonth'
                            eventClick={handleEventClick}
                            headerToolbar={{
                                left:'prev,next,today',
                                center:'title',
                                right:'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            eventReceive={handleEventReceive}
                            schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
                            events={apiEvents}
                            eventChange={handleEventChange}
                        />
                    </CalendarContainer>
                </MainCalendarContainer>                
            )
        }
    }


    return (
        <>  
            <MainCalendarHeaderContainer>
                <Fade>
                    <StyledMainHeader>Your Calendar</StyledMainHeader>
                </Fade>
            </MainCalendarHeaderContainer>
            {renderCalendarAfterStateLoad()}
        </>
    )
}


const mapStateToProps = state => {
    return {
        calendarEvents: state.calendarEvents
    }
}


export default connect(mapStateToProps, { addNewEvent, getEvents, deleteEvent, updateEvent })(Calendar);
