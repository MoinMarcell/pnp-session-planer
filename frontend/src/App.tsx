import Layout from "./components/Layout.tsx";
import EventApp from "./components/events/EventApp.tsx";
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventDetailsPage from "./components/events/EventDetailsPage.tsx";
import useEvents from "./hooks/useEvents.ts";
import LoginPage from "./LoginPage.tsx";
import useAppUser from "./hooks/useAppUser.ts";

export default function App() {
    const {saveEvent, events, deleteEvent, updateEvent} = useEvents();
    const {appUser, login, logout} = useAppUser();
    return (
        <Layout handleLogout={logout} appUser={appUser} saveEvent={saveEvent}>
            <Routes>
                <Route path="/" element={<EventApp events={events}/>}/>
                <Route path="/login" element={<LoginPage handleLogin={login}/>}/>
                <Route path="/events">
                    <Route path=":eventId"
                           element={<EventDetailsPage isAppUserAdmin={appUser?.role === "admin"}
                                                      handleUpdate={updateEvent} deleteEvent={deleteEvent}/>}/>
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
