import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Event, EventDto} from "../../types/Event.ts";
import {toast} from "react-toastify";
import LoadSpinnerDice from "../LoadSpinnerDice.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import EventFormDialog from "./EventFormDialog.tsx";
import Button from "@mui/material/Button";

type EventDetailsPageProps = {
    deleteEvent: (id: string) => Promise<string>;
    handleUpdate: (id: string, event: EventDto) => Promise<Event>,
    isAppUserAdmin: boolean,
}

export default function EventDetailsPage(props: Readonly<EventDetailsPageProps>) {
    const [event, setEvent] = useState<Event | null | undefined>(undefined);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [openEditEventDialog, setOpenEditEventDialog] = useState<boolean>(false);
    const params = useParams();
    const eventId = params.eventId;
    const navigate = useNavigate();

    function handleUpdateEventDialog() {
        setOpenEditEventDialog(!openEditEventDialog);
    }

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
                    navigate('/');
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
            navigate('/')
        }
    }

    async function update(id: string, eventDto: EventDto) {
        return props.handleUpdate(id, eventDto)
            .then((r) => {
                setEvent(r);
                return r;
            })
    }

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    if (event === undefined) {
        return <LoadSpinnerDice/>
    }

    if (event === null) {
        return <Navigate to={"/"}/>
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
        <Box sx={{width: '100%', display: 'flex', gap: 2, flexDirection: 'column'}}>
            <Paper sx={{
                padding: 2,
                mt: 2,
            }}>
                <Box>
                    <Typography sx={{textAlign: 'center'}} variant="h3">{event.title}</Typography>
                    <Typography sx={{textAlign: 'center'}} variant="body1">{event.description}</Typography>
                    <Typography variant="body2">Wo: {event.location}</Typography>
                    <Typography variant="body2">Start: {start}</Typography>
                    <Typography variant="body2">Ende: {end}</Typography>
                    {
                        props.isAppUserAdmin &&
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            pt: 2,
                        }}>
                            <LoadingButton variant="outlined" color="warning"
                                           onClick={handleUpdateEventDialog}>Bearbeiten</LoadingButton>
                            <EventFormDialog event={event} handleUpdate={update} open={openEditEventDialog}
                                             handleClose={handleUpdateEventDialog}/>
                            <LoadingButton variant="outlined" color="error" loading={isDeleting} onClick={deleteEvent}>Event
                                löschen</LoadingButton>
                        </Box>
                    }
                </Box>
            </Paper>
            <Box>
                <Button onClick={() => navigate("/")} color="info" variant="contained" sx={{width: '100%'}}>Zurück zur
                    Übersicht</Button>
            </Box>
        </Box>
    )
}