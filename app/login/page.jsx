"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Navigation from "@/app/components/navigation";
import Image from "next/image";
import googleIMG from "public/google.png"
import {
    auth,
    signInUserWithEmailAndPassword,
    signInWithGoogle,
} from "@/firebase/auth";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, so set the user state variable
                router.push("/home");
            }
        });
        return () => unsubscribe(); // unsubscribe from the listener when the component unmounts
    }, []);

    const loginHandler = async () => {
        await signInUserWithEmailAndPassword(email, password)
    };
    const handleGoogleLogIn = async () => {
        await signInWithGoogle();
    };

    return (
        <>
            <header><Navigation login={true}/></header>
            <main className="flex lg:h-[100vh]">
                <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                    <div className="p-8 w-[600px]">
                        <div className="text-2xl lg:text-4xl font-semibold">Авторизация</div>
                        <p className="mt-6 ml-1">
                            У вас нет аккаунта ?{" "}
                            <span
                                onClick={() => {
                                    router.push("/register");
                                }}
                                className="underline hover:text-blue-400 cursor-pointer"
                            >
                Регистрация
            </span>
                        </p>

                        <div
                            onClick={handleGoogleLogIn}
                            className="bg-gray-100 w-full py-4 mt-10 rounded-full transition-transform hover:bg-gree active:scale-90 flex justify-center items-center gap-4 cursor-pointer group border-[1px] border-gray-500 p-1 hover:border-green-600 hover:bg-green-200"
                        >

                            <span className="text-xl font-bold text-gray-600 ">
                              Войти через Google

                            </span>
                            <Image src={googleIMG} alt="googleImage"
                                   className="h-6 w-6 animatecss group-hover:animatecss-swing"/>

                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Почта</label>
                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                    required
                                />
                            </div>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Пароль</label>
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password"
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                    required
                                />
                            </div>
                            <button
                                onClick={loginHandler}
                                className="bg-green-600 font-bold text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-green-700 active:scale-90"
                            >
                                Войти
                            </button>
                        </form>

                    </div>
                </div>
                <div
                    className="w-[100%] bg-slate-400 bg-cover bg-left-top hidden lg:block"
                    style={{
                        backgroundImage: "url('/bg-login.jpg')",
                    }}
                >
                </div>

            </main>
        </>
    );
};

export default LoginForm;