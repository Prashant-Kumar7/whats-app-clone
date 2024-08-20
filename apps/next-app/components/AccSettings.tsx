"use client"

import { settingsAtom } from "@/state"
import { useSetRecoilState } from "recoil"


interface PropTypes {
    comein : boolean
}


export const AccSettings = ({comein} : PropTypes )=>{

    const setSettings = useSetRecoilState(settingsAtom)

    function handleBack(){
        setSettings(false)
    }

    return (
        <div style={{width : "34.5rem", height : "94.5%" , right : "98.5%"}} className={comein? "p-6 border-r border-gray-600 absolute  opacity-1 ease-in-out translate-x-full duration-300 bg-slate-900" : "p-6 border-r border-gray-600 absolute  opacity-0 ease-in-out duration-300 -translate-x-full bg-slate-900" }>
            <div className="text-slate-300 text-3xl hover:cursor-pointer" onClick={handleBack}>&#129128;</div>
            <div>Account settings</div>
        </div>
    )
}