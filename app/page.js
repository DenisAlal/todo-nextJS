"use client";
import ModalWindow from "./components/modalWindow.jsx";
import {useEffect, useState} from "react";
import Navigation from "./components/navigation";
import {auth} from "@/firebase/auth";
import {useRouter} from "next/navigation"
const aboutApp = "Todo это минималистичное веб приложение, с помощью которого можно всегда иметь доступ к своим задачам с любого устройства!  "
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
            <ModalWindow isOpen={openModalWindow} setOpenModalWindow={() => setOpenModalWindow(!openModalWindow)}/>
            <header><Navigation onSetOpenSignIn={setOpenModalWindow} login={false}/></header>
            <div className="absolute top-1/3 transform">
                <h1 className="font-bold text-xl text-gray-700 place-content-center bg-green-300 rounded-full mx-[50px] py-[100px] px-[50px] md:text-2xl xl:text-2xl lg:text-2xl lg:mx-[100p] sm:mx-[100px] xl:mx-[100px]">
                    {aboutApp}
                    <pre className="inline-block whitespace-nowrap ml-3"> ʕっ• ᴥ • ʔっ</pre>
                </h1>
            </div>
        </>
    )
}
