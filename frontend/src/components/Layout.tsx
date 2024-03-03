import {ReactNode} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Main from "./Main.tsx";
import {Grid} from "@mui/material";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <Header/>
            <Grid container>
                <Grid item sx={{
                    width: '100%',
                }}>
                    <Main children={props.children}/>
                </Grid>
                <Grid item sx={{
                    width: '100%',
                }}>
                    <Footer/>
                </Grid>
            </Grid>
        </>
    )
}