"use client"

import { menuAtom, settingsAtom } from "@/state"
import { signOut } from "next-auth/react"
import { useRef, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export const Menu = ()=>{

    const [menu,setMenu] = useRecoilState(menuAtom);
    const [focused , setFocused] = useState(false)
    const setSettings = useSetRecoilState(settingsAtom)
    const divRef = useRef<HTMLDivElement>(null);

    function handleFocus(){
        setMenu(!menu)
        setFocused(true)
    }


    function handleClick(){
        divRef.current?.focus()
        
    }   

    function handleBlur(){
        setMenu(!menu)
        setFocused(false)
    }


    function handleSettings(){
        setSettings(true)
    }


    return ( 
        <div className="absolute hover:cursor-pointer" onBlur={handleBlur} onFocus={handleFocus} tabIndex={-1} ref={divRef} onClick={handleClick} style={{left : "30%",width : "2rem" , height : "2rem"}} >
            <div  style={{width : "2rem" , height : "2rem"}} className={menu? "flex flex-col bg-slate-700 rounded-full justify-center items-center absolute" : "flex flex-col rounded-full justify-center items-center absolute"}>
                <div style={{width : "1px" , height : "1px", padding : "2px" , margin : "2px"}} className="rounded-full bg-slate-300"></div>
                <div style={{width : "1px" , height : "1px", padding : "2px" , margin : "2px"}} className="rounded-full bg-slate-300"></div>
                <div style={{width : "1px" , height : "1px", padding : "2px" , margin : "2px"}} className="rounded-full bg-slate-300"></div>
            </div>
            <div className={menu ? "relative list-none py-2 rounded-sm flex flex-col w-64 bg-slate-800 top-9 right-56 relative" : "hidden"}>
                <li className="pl-8 py-3 hover:bg-slate-900" onClick={handleSettings}>Settings</li>
                <li className="pl-8 py-3 hover:bg-slate-900" onClick={()=>{ signOut({callbackUrl : "/" , redirect : true}) }}>Logout</li>
            </div>
        </div>
            

    )
}


