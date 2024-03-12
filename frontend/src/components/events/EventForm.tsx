import Box from "@mui/material/Box";
import {ChangeEvent, FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import {Event, EventDto} from "../../types/Event.ts";
import Typography from "@mui/material/Typography";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";

type EventFormProps = {
    handleSave: (event: EventDto) => Promise<Event>,
}

export default function EventForm(props: Readonly<EventFormProps>) {
    const today = new Date();
    today.setDate(today.getDate() + 1);

    const [event, setEvent] = useState<EventDto>({
        title: '',
        description: '',
        location: '',
        start: new Date().toISOString().substring(0, 16),
        end: today.toISOString().substring(0, 16),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const name: string = event.target.name;
        const value: string = event.target.value;
        setEvent((prevState: EventDto) => ({...prevState, [name]: value}));
    }

    function resetForm(): void {
        setEvent({
            title: '',
            description: '',
            location: '',
            start: new Date().toISOString().substring(0, 16),
            end: today.toISOString().substring(0, 16),
        });
    }

    const checkDate: boolean = event.start > event.end || event.start === event.end;

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Event wird erstellt...");
        props.handleSave(event)
            .then(() => {
                toast.update(toastId, {
                    render: "Event wurde erstellt!",
                    type: 'success',
                    autoClose: 5000,
                    isLoading: false,
                });
                resetForm();
            })
            .catch((e) => {
                toast.update(toastId, {
                    render: "Fehler: " + e.message,
                    type: 'error',
                    autoClose: 5000,
                    isLoading: false,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
            }}
        >
            <TextField
                required
                id="new-event-title"
                label="Titel"
                name='title'
                value={event.title}
                onChange={handleChange}
            />
            <TextField
                required
                id="new-event-description"
                label="Beschreibung"
                name='description'
                value={event.description}
                onChange={handleChange}
            />
            <TextField
                required
                id="new-event-location"
                label="Veranstaltungsort"
                name='location'
                value={event.location}
                onChange={handleChange}
            />
            <TextField
                required
                type='datetime-local'
                id="new-event-start"
                label="Start"
                name='start'
                value={event.start}
                onChange={handleChange}
                error={checkDate}
            />
            <TextField
                required
                type='datetime-local'
                id="new-event-end"
                label="Ende"
                name='end'
                value={event.end}
                onChange={handleChange}
                error={checkDate}
                helperText="Mit * markierte Felder sind Pflichtfelder."
            />
            {
                checkDate
                    ? <Typography paragraph color={'red'}>Das Enddatum muss NACH dem Startdatum liegen.</Typography>
                    : null
            }
            <LoadingButton type='submit' loading={isLoading} variant="outlined">
                Erstellen
            </LoadingButton>
        </Box>
    );
}