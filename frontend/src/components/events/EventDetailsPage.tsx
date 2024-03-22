import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Event} from "../../types/Event.ts";
import {toast} from "react-toastify";
import LoadSpinnerDice from "../LoadSpinnerDice.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import {LoadingButton} from "@mui/lab";

type EventDetailsPageProps = {
    deleteEvent: (id: string) => Promise<string>;
}

export default function EventDetailsPage(props: Readonly<EventDetailsPageProps>) {
    const [event, setEvent] = useState<Event | null | undefined>(undefined);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const params = useParams();
    const eventId = params.eventId;
    const navigate = useNavigate();

    function deleteEvent() {
        if (event) {
            setIsDeleting(true);
            const toastId = toast.loading("Event wird gelöscht...");
            props.deleteEvent(event.id)
                .then((r) => {
                    toast.update(toastId, {
                        render: r,
                        type: 'success',
                        autoClose: 5000,
                        isLoading: false,
                    });
                    navigate('/events');
                })
                .catch((error) => {
                    const code = error.response.status;
                    if (code === 404) {
                        toast.update(toastId, {
                            render: "Das Event wurde nicht gefunden!",
                            type: 'error',
                            autoClose: 5000,
                            isLoading: false,
                        });
                    } else {
                        toast.update(toastId, {
                            render: "Fehler beim Löschen des Events: " + error.message,
                            type: 'error',
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
                .finally(() => setIsDeleting(false));
        } else {
            toast.error('Event is missing');
        }
    }

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
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                    pt: 2,
                }}>
                    <LoadingButton variant="outlined" color="error" loading={isDeleting} onClick={deleteEvent}>Event
                        löschen</LoadingButton>
                </Box>
            </Box>
        </Paper>
    )
}