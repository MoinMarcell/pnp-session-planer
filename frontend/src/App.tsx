import Layout from "./components/Layout.tsx";
import EventApp from "./components/events/EventApp.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailsPage from "./components/events/EventDetailsPage.tsx";
import useEvents from "./hooks/useEvents.ts";

export default function App() {
    const {saveEvent, events, deleteEvent, updateEvent} = useEvents();
    return (
        <Layout>
            <Routes>
                <Route path="/events">
                    <Route index element={<EventApp events={events} saveEvent={saveEvent}/>}/>
                    <Route path=":eventId"
                           element={<EventDetailsPage handleUpdate={updateEvent} deleteEvent={deleteEvent}/>}/>
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
