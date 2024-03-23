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
                mb: 9,
            }}
        >
            {props.children}
        </Container>
    );
}