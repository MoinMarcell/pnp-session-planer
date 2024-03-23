import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import EventFormDialog from "./events/EventFormDialog.tsx";
import {Event, EventDto} from "../types/Event.ts";
import {AppUser} from "../types/AppUser.ts";
import {toast} from "react-toastify";
import {CircularProgress} from "@mui/material";

type UserMenuProps = {
    anchorElUser: null | HTMLElement,
    handleCloseUserMenu: (href?: string) => void,
    saveEvent: (event: EventDto) => Promise<Event>,
    appUser: AppUser,
    handleLogout: () => Promise<void>,
}

export default function UserMenu(props: Readonly<UserMenuProps>) {
    const [openNewEventDialog, setOpenNewEventDialog] = useState<boolean>(false);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    function handleNewEventDialog() {
        props.handleCloseUserMenu();
        setOpenNewEventDialog(!openNewEventDialog);
    }

    function handleLogoutClick() {
        setIsLoggingOut(true);
        const toastId = toast.loading("Abmelden...");
        props.handleLogout()
            .then(() => {
                toast.update(toastId, {
                    render: "Abgemeldet!",
                    type: 'success',
                    autoClose: 5000,
                    isLoading: false,
                });
                props.handleCloseUserMenu("/login");
            })
            .catch((error) => {
                toast.update(toastId, {
                    render: "Fehler beim Abmelden: " + error.message,
                    type: 'error',
                    autoClose: 5000,
                    isLoading: false,
                });
                props.handleCloseUserMenu();
            })
            .finally(() => setIsLoggingOut(false));
    }

    return (
        <>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={props.anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(props.anchorElUser)}
                onClose={() => props.handleCloseUserMenu()}
            >
                {
                    props.appUser.role === "admin" &&
                    <MenuItem onClick={handleNewEventDialog}>
                        <Typography textAlign="center">Event erstellen</Typography>
                    </MenuItem>
                }
                <MenuItem onClick={handleLogoutClick}>
                    <Typography textAlign="center">{isLoggingOut ? <CircularProgress/> : 'Abmelden'}</Typography>
                </MenuItem>
            </Menu>
            <EventFormDialog handleSave={props.saveEvent} open={openNewEventDialog} handleClose={handleNewEventDialog}/>
        </>
    );
}