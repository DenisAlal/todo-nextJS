"use client";
import ModalWindow from "./components/modalWindow.jsx";
import {useState} from "react";
import NavGuest from "./components/navGuest";
import { setCookie } from 'cookies-next';

export default function Home() {

    const [openModalWindow, setOpenModalWindow] = useState(false)

    setCookie('key', 'value');
    return (
        <>
            <header><NavGuest onSetOpenSignIn={setOpenModalWindow} login = {false} /></header>
            <main className="flex min-h-screen flex-col items-center justify-between ">
                <ModalWindow isOpen={openModalWindow} setOpenModalWindow={() => setOpenModalWindow(!openModalWindow)} />
            </main>
        </>
    )
}
