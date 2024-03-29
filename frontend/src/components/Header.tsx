import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {faDiceD20, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Icon from '@mui/material/Icon';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";
import UserMenu from "./UserMenu.tsx";
import {Avatar} from "@mui/material";
import {Event, EventDto} from "../types/Event.ts";

const pages = [
    {name: 'Startseite', href: '/'},
];

interface Props {
    window?: () => Window;
    children?: React.ReactElement;
    appUser: AppUser | null | undefined;
    saveEvent: (event: EventDto) => Promise<Event>;
    handleLogout: () => Promise<void>,
}

function ScrollTop(props: Readonly<Props>) {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                sx={{position: 'fixed', bottom: 16, right: 16, zIndex: 1000}}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default function Header(props: Readonly<Props>) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (href?: string) => {
        setAnchorElNav(null);
        if (href) navigate(href);
    };

    const handleCloseUserMenu = (href?: string) => {
        setAnchorElUser(null);
        if (href) navigate(href);
    };

    return (
        <>
            <CssBaseline/>
            <AppBar position="static" id="back-to-top-anchor">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Icon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}><FontAwesomeIcon icon={faDiceD20}/></Icon>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HORT-PLANER
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={() => handleCloseNavMenu()}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.href)}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Icon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}><FontAwesomeIcon icon={faDiceD20}/></Icon>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HORT-PLANER
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleCloseNavMenu(page.href)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            {
                                !props.appUser &&
                                <Tooltip title="Anmelden">
                                    <IconButton sx={{p: 0}} onClick={() => navigate("/login")}>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </IconButton>
                                </Tooltip>
                            }
                            {
                                props.appUser &&
                                (
                                    <>
                                        <Tooltip title="Benutzer Menü">
                                            <IconButton sx={{p: 0}} onClick={handleOpenUserMenu}>
                                                <Avatar>{props.appUser.username.substring(0, 1)}</Avatar>
                                            </IconButton>
                                        </Tooltip>
                                        <UserMenu handleLogout={props.handleLogout} appUser={props.appUser}
                                                  saveEvent={props.saveEvent} anchorElUser={anchorElUser}
                                                  handleCloseUserMenu={handleCloseUserMenu}/>
                                    </>
                                )
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </>
    );
}
