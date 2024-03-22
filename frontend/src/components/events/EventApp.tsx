import {useState} from "react";
import NewEventDialog from "./NewEventDialog.tsx";
import EventGallery from "./EventGallery.tsx";
import {Event, EventDto, EventWithIdAndTitle} from "../../types/Event.ts";

type EventAppProps = {
    events: EventWithIdAndTitle[];
    saveEvent: (event: EventDto) => Promise<Event>;
}

export default function EventApp(props: Readonly<EventAppProps>) {
    const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);

    function handleNewEventDialog() {
        setOpenNewEventDialog(!openNewEventDialog);
    }

    return (
        <>
            <button onClick={handleNewEventDialog}>Neues Event erstellen</button>
            <NewEventDialog handleSave={props.saveEvent} open={openNewEventDialog} handleClose={handleNewEventDialog}/>

            <EventGallery events={props.events}/>
        </>
    );
}