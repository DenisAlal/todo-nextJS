
"use client"
import React from 'react'
import { getCookie } from 'cookies-next';




export default function Home() {
    console.log(getCookie('key'))
    return (
        <div >
            <div >
                {name}
                abobaaa
            </div>
        </div>
    )
}
