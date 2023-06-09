import {useEffect, useState} from "react";
import Link from "next/link";
import {auth, signOutUser} from "@/firebase/auth";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";

const login = "/login"
const back = "/"
export default function Navigation(props) {

    const [navbar, setNavbar] = useState(false);
    const loginCheck = props.login
    const authUser = props.userAuth

    function modalOpenClick() {
        props.onSetOpenSignIn(true)
    }

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(getCookie('key'))
    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOutUser(auth);
            setUser(null); // clear the user state variable
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <nav className="w-full bg-current shadow bg-sky-600">
            <div className="justify-between  mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        {authUser !== true &&
                            <>
                                <Link href="/"><h2
                                    className="bg-transparent w-full rounded-lg  hover:text-fuchsia-300 text-white text-2xl font-bold">ToDO</h2>
                                </Link>
                            </>
                        }
                        {authUser === true &&
                            <>
                                <Link href="/home"><h2
                                    className="bg-transparent w-full rounded-lg  hover:text-fuchsia-300 text-white text-2xl font-bold">ToDO</h2>
                                </Link>
                            </>
                        }


                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            {authUser !== true &&
                                <>
                                    {!loginCheck
                                        &&
                                        <>
                                            <button
                                                id="btn"
                                                className="bg-transparent w-full py-4 rounded-lg duration-500 hover:text-fuchsia-300 text-white"
                                                onClick={() => modalOpenClick()}
                                            >
                                                Открыть модальное окно
                                            </button>
                                            <Link href={login}>
                                                <button
                                                    id="btn"
                                                    className="bg-transparent w-full py-4 rounded-lg duration-500 hover:text-fuchsia-300 text-white"
                                                >
                                                    Войти
                                                </button>
                                            </Link>
                                        </>
                                    }
                                    {loginCheck &&
                                        <Link href={back}>
                                            <button
                                                id="btn"
                                                className="bg-transparent w-full py-4 rounded-lg duration-500 hover:text-fuchsia-300 text-white"
                                            >
                                                Назад
                                            </button>
                                        </Link>

                                    }
                                </>
                            }

                            {authUser === true &&
                                <>
                                    <button
                                        id="btn"
                                        className="bg-transparent w-full py-4 rounded-lg duration-500 hover:text-fuchsia-300 text-white"
                                        onClick={handleSignOut}
                                    >
                                        Выйти
                                    </button>

                                </>
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
        ;
}