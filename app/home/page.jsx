"use client"
import React, {useEffect, useState} from "react";
import Navigation from "@/app/components/navigation";
import {useRouter} from "next/navigation";
import {getFirestore} from "firebase/firestore";
import {app} from "@/firebase/firebase";
import {auth, signOutUser} from "@/firebase/auth";

import {
    collection,
    addDoc,
    getDocs,
    where,
    query,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {GoSignOut} from "react-icons/go";
import {AiOutlinePlus} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";

const db = getFirestore(app);
export default function Home() {

    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getTodos = async () => {
        if (!user) {
            return; // user is null or undefined, so exit early
        }
        const q = query(collection(db, "todos"), where("owner", "==", user.uid));
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push({...doc.data(), id: doc.id});
        });
        setTodos(data);
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, so set the user state variable
                setUser(user);
                setLoading(false);
                getTodos();
            } else {
                // No user is signed in, so clear the user state variable
                router.push("/");
                setUser(null);
            }
        });

        if (user) {
            getTodos();
        }

        return () => unsubscribe(); // unsubscribe from the listener when the component unmounts
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

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

    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                owner: user.uid,
                content: todoInput,
                completed: false,
            });
            console.log("Document written with ID: ", docRef.id);
            await getTodos();
            setTodoInput("");
            console.log("todos", todos);
        } catch (e) {
            console.error("ОШибка добавления задачи: ", e);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            await getTodos();
        } catch (e) {
            console.error("Ошибка удаления задачи: ", e);
        }
    };

    const markAsCompleted = async (event, id) => {
        try {
            await updateDoc(doc(db, "todos", id), {
                completed: event.target.checked,
            });
            await getTodos();
        } catch (e) {
            console.error("Ошибка обновления задач: ", e);
        }
    };

    const onKeyUp = (event) => {
        if (event.key === "Enter") {
            if (todoInput.trim() !== "") {
                addTodo();
            }
        }
    };
    return (
        <>
            <header><Navigation userAuth={true}/></header>
            {/*<div>*/}
            {/*    {user !== null &&*/}
            {/*        <>{user.displayName}, ваши задачи:</>*/}
            {/*    }*/}
            {/*</div>*/}
            <div>

                <div className="max-w-3xl mx-auto mt-10 p-8">
                    <div className="bg-white -m-6 p-3 sticky top-0">
                        <div className="flex items-center gap-2 mt-10">
                            <input
                                placeholder={`Введите свою задачу`}
                                type="text"
                                className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-green-500 text-lg transition-all duration-300"
                                autoFocus
                                value={todoInput}
                                onChange={(e) => setTodoInput(e.target.value)}
                                onKeyUp={onKeyUp}
                            />
                            <button
                                onClick={() => {
                                    if (todoInput.trim() !== "") {
                                        addTodo();
                                    }
                                }}
                                className="w-[60px] h-[60px] rounded-md bg-green-600 flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-green-500 p-[12px] hover:rounded-2xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 20 20"
                                     fill="none">
                                    <path fill="#FFF" fillRule="evenodd"
                                          d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="my-10">
                        {todos.length > 0 &&
                            todos.map((todo, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mt-[20px]">
                                        <div className="flex items-center gap-4">
                                            <input
                                                id={`todo-${todos.id}`}
                                                type="checkbox"
                                                className="w-5 h-5 accent-green-600 "
                                                checked={todo.completed}
                                                onChange={(event) => markAsCompleted(event, todo.id)}
                                            />
                                            <label
                                                htmlFor={`todo-${todo.id}`}
                                                className={`font-medium ${
                                                    todo.completed ? "line-through text-gray-400 " : ""
                                                }`}
                                            >
                                                {todo.content}
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                 className="w-[24px] h-[24px] icon glyph fill-red-500 stroke-[#ffffff] hover:fill-red-700 animatecss hover:animatecss-tada" onClick={() => deleteTodo(todo.id)}>
                                                <g  strokeWidth="0"/>
                                                <g  strokeLinecap="round" strokeLinejoin="round"/>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M17,4V5H15V4H9V5H7V4A2,2,0,0,1,9,2h6A2,2,0,0,1,17,4Z"/>
                                                    <path
                                                        d="M20,6H4A1,1,0,0,0,4,8H5.07l.87,12.14a2,2,0,0,0,2,1.86h8.14a2,2,0,0,0,2-1.86L18.93,8H20a1,1,0,0,0,0-2ZM13,17a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z"/>
                                                </g>
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}
