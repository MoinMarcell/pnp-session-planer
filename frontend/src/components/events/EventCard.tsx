import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {EventWithIdAndTitle} from "../../types/Event.ts";
import {useNavigate} from "react-router-dom";
import dice from '../../assets/dice.jpg';

type EventCardProps = {
    event: EventWithIdAndTitle
}

export default function EventCard(props: Readonly<EventCardProps>) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardActionArea onClick={() => navigate(`/events/${props.event.id}`)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={dice}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.event.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}