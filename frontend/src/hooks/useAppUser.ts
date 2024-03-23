import {useEffect, useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import axios from "axios";

export default function useAppUser() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);

    function fetchMe() {
        axios.get("/api/users/me")
            .then(response => setAppUser(response.data))
            .catch(() => {
                setAppUser(null);
            });
    }

    async function login(username: string, password: string): Promise<void> {
        return axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(() => fetchMe())
            .catch(error => {
                throw error
            });
    }

    async function logout(): Promise<void> {
        return axios.post("/api/users/logout")
            .then(() => fetchMe())
            .catch(error => {
                throw error;
            });
    }

    useEffect(() => {
        fetchMe();
    }, []);

    return {appUser, login, logout};
}