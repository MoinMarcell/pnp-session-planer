import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Event} from "../../types/Event.ts";
import {toast} from "react-toastify";
import LoadSpinnerDice from "../LoadSpinnerDice.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";

export default function EventDetailsPage() {
    const [event, setEvent] = useState<Event | null | undefined>(undefined);
    const params = useParams();
    const eventId = params.eventId;
    const navigate = useNavigate();

    function fetchEvent(): void {
        if (eventId) {
            axios.get<Event>(`/api/events/${eventId}`)
                .then(response => setEvent(response.data))
                .catch((e) => {
                    setEvent(null);
                    const code = e.response.status;
                    if (code === 404) {
                        toast.error('Event not found');
                    } else {
                        toast.error('Failed to fetch event');
                    }
                });
        } else {
            toast.error('ID is missing');
            navigate('/events')
        }
    }

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    if (event === undefined) {
        return <LoadSpinnerDice/>
    }

    if (event === null) {
        return <Navigate to={"/events"}/>
    }

    const start: string = new Date(event.start).toLocaleString("de", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    const end: string = new Date(event.end).toLocaleString("de", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Paper sx={{
            padding: 2,
            mt: 2,
            width: '100%',
        }}>
            <Box>
                <Typography sx={{textAlign: 'center'}} variant="h3">{event.title}</Typography>
                <Typography sx={{textAlign: 'center'}} variant="body1">{event.description}</Typography>
                <Typography variant="body2">Wo: {event.location}</Typography>
                <Typography variant="body2">Start: {start}</Typography>
                <Typography variant="body2">Ende: {end}</Typography>
            </Box>
        </Paper>
    )
}