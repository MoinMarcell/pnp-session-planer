import Layout from "./components/Layout.tsx";
import EventApp from "./components/events/EventApp.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/events">
                    <Route index element={<EventApp/>}/>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Layout>
    )
}
