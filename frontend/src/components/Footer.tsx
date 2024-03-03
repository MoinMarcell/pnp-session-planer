import {BottomNavigation} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <BottomNavigation
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography>
                &copy; 2024 Hort Planer
            </Typography>
        </BottomNavigation>
    );
}