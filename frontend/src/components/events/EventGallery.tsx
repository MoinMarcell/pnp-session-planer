import {EventWithIdAndTitle} from "../../types/Event.ts";
import EventCard from "./EventCard.tsx";
import Box from "@mui/material/Box";

type EventGalleryProps = {
    events: EventWithIdAndTitle[]
}
export default function EventGallery(props: Readonly<EventGalleryProps>) {
    const cards = props.events.map(event => <EventCard key={event.id} event={event}/>).reverse();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
        }}>
            {cards}
        </Box>
    );
}