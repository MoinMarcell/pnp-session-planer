import LoginForm from "./components/LoginForm.tsx";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

type LoginPageProps = {
    handleLogin: (username: string, password: string) => Promise<void>,
}

export default function LoginPage(props: Readonly<LoginPageProps>) {
    return (
        <Paper sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
            mt: 2,
            p: 2
        }}>
            <Typography variant="h4">Anmelden</Typography>
            <LoginForm handleLogin={props.handleLogin}/>
        </Paper>
    );
}