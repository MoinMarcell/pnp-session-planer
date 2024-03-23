import EventGallery from "./EventGallery.tsx";
import {EventWithIdAndTitle} from "../../types/Event.ts";

type EventAppProps = {
    events: EventWithIdAndTitle[];
}

export default function EventApp(props: Readonly<EventAppProps>) {


    return (
        <EventGallery events={props.events}/>
    );
}