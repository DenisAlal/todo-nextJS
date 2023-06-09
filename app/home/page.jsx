"use client"
import React, {useEffect, useState} from "react";
import Navigation from "@/app/components/navigation";
import {useRouter} from "next/navigation";
import {getFirestore} from "firebase/firestore";
import {app} from "@/firebase/firebase";
import {auth} from "@/firebase/auth";

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

const db = getFirestore(app);
export default function Home() {

    const [todoInput, setTodoInput] = useState("");
    const [todos, setTodos] = useState([]);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // const getTodos = async () => {
    //     console.log("entered");
    //     if (!user) {
    //         return; // user is null or undefined, so exit early
    //     }
    //     const q = query(collection(db, "todos"), where("owner", "==", user.uid));
    //     let data = [];
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         data.push({...doc.data(), id: doc.id});
    //     });
    //     setTodos(data);
    //     setLoading(false);
    // };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, so set the user state variable
                setUser(user);
                setLoading(false);
                //getTodos();
            } else {
                // No user is signed in, so clear the user state variable
                router.push("/login");
                setUser(null);
            }
        });

        // if (user) {
        //     getTodos();
        // }

        return () => unsubscribe(); // unsubscribe from the listener when the component unmounts
    }, [user]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }
    return (
        <>
            <header><Navigation userAuth={true}/></header>
            <div>
                {user !== null &&
                    <>{user.displayName}</>

                }
            </div>
        </>
    )
}
