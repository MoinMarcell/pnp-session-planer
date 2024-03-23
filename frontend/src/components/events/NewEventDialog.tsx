import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EventForm from "./EventForm.tsx";
import {Event, EventDto} from "../../types/Event.ts";

type NewEventDialogProps = {
    open: boolean,
    handleClose: () => void,
    handleSave?: (event: EventDto) => Promise<Event>,
    event?: Event,
    handleUpdate?: (id: string, event: EventDto) => Promise<Event>,
}

export default function NewEventDialog(props: Readonly<NewEventDialogProps>) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Event erstellen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hier kannst du ein neues Event erstellen und direkt veröffentlichen!
                </DialogContentText>
                <EventForm handleUpdate={props.handleUpdate} event={props.event} handleClose={props.handleClose}
                           handleSave={props.handleSave}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} type='button'>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}