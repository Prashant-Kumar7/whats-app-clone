"use client"

import { LoggedInUserAtom, settingsAtom, updateAtom } from "@/state"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { UploadSection } from "./UploadSection"


interface PropTypes {
    comein : boolean
}


export const AccSettings = ({comein} : PropTypes )=>{

    const setSettings = useSetRecoilState(settingsAtom)
    const [currentUser, setCurrenUser] = useRecoilState<any>(LoggedInUserAtom)
    const [editClick, setEditClick] = useState(false)
    const divRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState(currentUser.username)
    const [picUrl , setPicUrl] = useState(currentUser.profilePic)
    const setUpdateAtom = useSetRecoilState(updateAtom)
    const [available , setAvailable] = useState(false)
    function handleBack(){
        setSettings(false)
    }

    function handleEdit(){
        setEditClick(true)
    }

    function handleChange(e : any){ 
        setInput(e.target.value)
    }

    useEffect(()=>{
        return ()=>{
            setInput(currentUser.username)
        }
    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          axios.get("http://localhost:3000/api/profile/find-username/" + input).then((res)=>{
            const response = res.data.msg;
            if(typeof(response) === "boolean"){
                setAvailable(response)
            }
          })

        }, 300)
        
        return () => clearTimeout(delayDebounceFn)
    }, [input])

    function handleSubmit(){
        if(input !== "" && input !== currentUser.username && available){
            axios.put("http://localhost:3000/api/profile" , {username : input})
            setEditClick(false)
            setUpdateAtom(true)
        } else {
            setInput(currentUser.username)
            setEditClick(false)
            setUpdateAtom(true)
        }
    }



    return (
        <div style={{width : "34.5rem", height : "94.5%" , right : "98.5%"}} className={comein? "p-6 border-r border-gray-600 absolute  opacity-1 ease-in-out translate-x-full duration-300 bg-slate-900" : "p-6 border-r border-gray-600 absolute  opacity-0 ease-in-out duration-300 -translate-x-full bg-slate-900" }>
            <div className="text-slate-300 text-3xl hover:cursor-pointer" onClick={handleBack}>&#129128;</div>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <div className="bg-gray-400 rounded-full"   >
                        <img style={{zIndex : "-1" , width : "15rem" , height: "15rem"}} className= "rounded-full" src={picUrl} alt="" />
                    </div>

                    <UploadSection setPicUrl={setPicUrl}/>
                </div>

                <div>
                    <div className="text-md text-green-700 font-medium m-4">Your username</div>
                    <div className={editClick? "flex items-center justify-between border-b border-slate-500" : "flex items-center justify-between"}>



                        <input tabIndex={-1} className="bg-transparent text-lg p-2 w-full ml-2 border-x-0 border-y-0 focus:ring-0 focus:outline-none border-slate-300" onChange={handleChange} value={input} type="text" disabled={!editClick} />
                        

                        {editClick ? <svg onClick={handleSubmit} viewBox="0 0 24 24" height="30" width="30" preserveAspectRatio="xMidYMid meet" className="mr-6 text-slate-500" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>checkmark</title><path fill="currentColor" d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"></path></svg> : <svg onClick={handleEdit} viewBox="0 0 24 24" height="30" width="30" preserveAspectRatio="xMidYMid meet" className="mr-6 text-slate-500" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>pencil</title><path fill="currentColor" d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"></path></svg>}
                    </div>
                    <div className={input==="" || !editClick? "hidden" : ""}>
                        {available || currentUser.username===input ? <span className="text-green-500 text-sm font-semibold">username is available</span> : <span className="text-red-600 text-sm font-semibold">username is taken</span>}
                    </div>
                </div>


            </div>
        </div>
    )
}