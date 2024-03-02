import {ReactNode} from "react";
import './Main.css';

type MainProps = {
    children: ReactNode;
};

export default function Main(props: Readonly<MainProps>) {
    return (
        <main className="main">
            <div className=".main__container">
                {props.children}
            </div>
        </main>
    );
}