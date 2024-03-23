import {InputAdornment, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

type LoginFormProps = {
    handleLogin: (username: string, password: string) => Promise<void>,
}

export default function LoginForm(props: Readonly<LoginFormProps>) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const navigate = useNavigate();

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Anmelden...");
        props.handleLogin(username, password)
            .then(() => {
                toast.update(toastId, {
                    render: "Anmeldung erfolgreich",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
                setUsername("");
                setPassword("");
                navigate("/");
            })
            .catch(() => {
                toast.update(toastId, {
                    render: "Anmeldung fehlgeschlagen",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000
                });
                setIsError(true);
                setPassword("");
                setInterval(() => setIsError(false), 5000);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                label="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={isError}
            />
            <TextField
                label="Passwort"
                type={showPassword ? 'text' : 'password'}
                value={password}
                error={isError}
                helperText={isError ? "Benutzername oder Passwort falsch" : ""}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <LoadingButton
                color="success"
                variant={"outlined"}
                type="submit"
                loading={isLoading}
            >
                Anmelden
            </LoadingButton>
        </Box>
    );
}