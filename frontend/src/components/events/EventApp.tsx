import {useState} from "react";
import NewEventDialog from "./NewEventDialog.tsx";
import useEvents from "../../hooks/useEvents.ts";

export default function EventApp() {
    const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);
    const {saveEvent} = useEvents();

    function handleNewEventDialog() {
        setOpenNewEventDialog(!openNewEventDialog);
    }

    return (
        <>
            <button onClick={handleNewEventDialog}>Neues Event erstellen</button>
            <NewEventDialog handleSave={saveEvent} open={openNewEventDialog} handleClose={handleNewEventDialog}/>
        </>
    );
}