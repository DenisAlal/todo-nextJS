"use client";
import ModalWindow from "./components/modalWindow.jsx";
import {useEffect, useState} from "react";
import Navigation from "./components/navigation";
import { setCookie } from 'cookies-next';
import {auth} from "@/firebase/auth";
import {useRouter} from "next/navigation";

export default function Welcome() {
    const router = useRouter();
    const [openModalWindow, setOpenModalWindow] = useState(false)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, so set the user state variable
                router.push("/home");
            }
        });
        return () => unsubscribe(); // unsubscribe from the listener when the component unmounts
    }, []);

    return (
        <>
            <header><Navigation onSetOpenSignIn={setOpenModalWindow} login = {false} /></header>
            <main className="flex min-h-screen flex-col items-center justify-between ">
                <ModalWindow isOpen={openModalWindow} setOpenModalWindow={() => setOpenModalWindow(!openModalWindow)} />
                You on WelcomePage
            </main>
        </>
    )
}
