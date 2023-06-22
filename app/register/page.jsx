"use client";

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Navigation from "@/app/components/navigation";
import bg from "/public/bg-login.jpg";
import Image from "next/image";
import googleIMG from "public/google.png";
import {
    auth,
    signUpUserWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase/auth";

const RegisterForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState(null);
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

    const singupHandler = async () => {
        await signUpUserWithEmailAndPassword(email, password, username);
        router.push("/home");
    };
    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        router.push("/home");
    };

    return (
        <>
            <header><Navigation login={true}/></header>
            <main className="flex lg:h-[100vh]">
                <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                    <div className="p-8 w-[600px]">
                        <div className="text-2xl lg:text-4xl font-semibold">Регистрация</div>
                        <p className="mt-6 ml-1">
                            У вас есть аккаунт ?{" "}
                            <span
                                onClick={() => {
                                    router.push("/login");
                                }}
                                className="underline hover:text-blue-400 cursor-pointer"
                            >
                              Авторизация
                            </span>
                        </p>
                        <div
                            onClick={handleGoogleSignIn}
                            className="bg-gray-100 w-full py-4 mt-10 rounded-full transition-transform
                            hover:bg-gree active:scale-90 flex justify-center items-center
                            gap-4 cursor-pointer group border-[1px] border-gray-500 p-1
                            hover:border-green-600 hover:bg-green-200">
                            <span className="text-xl font-bold text-gray-600 ">
                              Войти через Google

                            </span>
                            <Image src={googleIMG} alt="googleImage"
                                   className="h-6 w-6 animatecss group-hover:animatecss-swing"/>

                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                    required
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Почта</label>
                                <input
                                    type="email"
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mt-10 pl-1 flex flex-col">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <button
                                onClick={singupHandler}
                                className="bg-green-600 font-bold text-white  py-4 mt-10 rounded-full transition-transform hover:bg-green-700 active:scale-90 px-4"
                            >
                                Зарегистрироваться
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

export default RegisterForm;
