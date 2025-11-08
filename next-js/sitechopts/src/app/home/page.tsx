"use client"
import { Menu } from "@/src/components/Menu"
import { useEffect } from "react"

export default function Home() {

    useEffect(() => {
        console.log("Iniciou o site")
    }, [])

    return (
        <>
            <Menu />
            <main>
                <h1>Welcome to the Home Page</h1>
            </main>
        </>
    )
}