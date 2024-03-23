import {ReactNode} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Main from "./Main.tsx";
import {AppUser} from "../types/AppUser.ts";
import {Event, EventDto} from "../types/Event.ts";

type LayoutProps = {
    children: ReactNode,
    appUser: AppUser | null | undefined,
    saveEvent: (event: EventDto) => Promise<Event>;
    handleLogout: () => Promise<void>,
};

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header handleLogout={props.handleLogout} saveEvent={props.saveEvent} appUser={props.appUser}/>
            <Main>
                {props.children}
            </Main>
            <Footer/>
        </>
    )
}