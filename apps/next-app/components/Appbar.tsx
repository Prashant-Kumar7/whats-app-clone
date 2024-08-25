"use client"

import { signIn, signOut } from "next-auth/react"
import { Menu } from "./Menu"
import { UploadSection } from "./UploadSection"





export const Appbar = ()=>{
    return (
        <div className="flex p-4">
            <button className="bg-slate-700 m-2 p-2 rounded-lg" onClick={()=>{ signIn(undefined , {callbackUrl : "/chats"}) }}>Signin</button>
            <button className="bg-slate-700 m-2 p-2 rounded-lg mr-10" onClick={()=>{ signOut({callbackUrl : "/" , redirect : true}) }}> Signout</button>
            {/* <UploadSection/> */}
        </div>
    )
}