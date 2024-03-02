import {ReactNode} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Main from "./Main.tsx";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header/>
            <Main children={props.children}/>
            <Footer/>
        </>
    )
}