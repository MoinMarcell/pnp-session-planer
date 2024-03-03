import {ReactNode} from "react";
import Container from "@mui/material/Container";

type MainProps = {
    children: ReactNode;
};

export default function Main(props: Readonly<MainProps>) {
    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: 'calc(100vh - 56px - 56px)',
            }}
        >
            {props.children}
        </Container>
    );
}