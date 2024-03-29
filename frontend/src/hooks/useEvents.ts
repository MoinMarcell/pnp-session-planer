import {useEffect, useState} from "react";
import {Event, EventDto} from "../types/Event.ts";
import axios from "axios";
import {toast} from "react-toastify";

export default function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const EVENTS_ENDPOINT: string = '/api/events';

    async function saveEvent(eventDto: EventDto): Promise<Event> {
        return axios.post(EVENTS_ENDPOINT, eventDto)
            .then(response => {
                setEvents([...events, response.data]);
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    async function updateEvent(id: string, eventDto: EventDto): Promise<Event> {
        return axios.put(`${EVENTS_ENDPOINT}/${id}`, eventDto)
            .then((r) => {
                fetchEvents();
                return r.data;
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    async function deleteEvent(id: string): Promise<string> {
        return axios.delete(`${EVENTS_ENDPOINT}/${id}`)
            .then((r) => {
                fetchEvents();
                return r.data;
            })
            .catch((error) => {
                throw new Error(error);
            })
    }

    function fetchEvents() {
        axios.get(EVENTS_ENDPOINT)
            .then(response => setEvents(response.data))
            .catch((error) => {
                toast.error('Failed to fetch events: ' + error.message)
            });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return {
        events,
        saveEvent,
        deleteEvent,
        updateEvent,
    }
}