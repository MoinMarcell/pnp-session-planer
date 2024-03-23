import Box from "@mui/material/Box";
import {faDiceD20} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function LoadSpinnerDice() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <FontAwesomeIcon icon={faDiceD20} spin size="2xl"/>
        </Box>
    );
}