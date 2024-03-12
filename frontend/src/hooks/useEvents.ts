import {useState} from "react";
import {Event, EventDto} from "../types/Event.ts";
import axios from "axios";

export default function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const EVENTS_ENDPOINT: string = '/api/events';

    async function saveEvent(eventDto: EventDto): Promise<Event> {
        return axios.post(EVENTS_ENDPOINT, eventDto)
            .then(response => {
                setEvents([...events, response.data]);
                return response.data;
            })
            .catch(error => {
                throw new error;
            })
    }

    return {
        events,
        saveEvent
    }
}