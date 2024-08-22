"use client"

import { currentChatAtom, profileInfoAtom, viewProfilePicAtom } from "@/state"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"


export const ProfileInfo = ({comein}: any)=>{

    const setProfileInfoView = useSetRecoilState(profileInfoAtom)
    const currentChat = useRecoilValue(currentChatAtom)
    const setOpenModal = useSetRecoilState(viewProfilePicAtom)
    useEffect(()=>{
        setProfileInfoView(false)
    },[currentChat.profileId])

    function handleClose(){
        setProfileInfoView(false)
    }

    return (
        <div style={{width : "20%", height : "94.75%" , left : "77%"}} className={comein? "p-6 border-l border-gray-600 absolute  opacity-1 -transalte-x-full ease-in-out duration-300 bg-slate-900" : "p-6 border-l border-gray-600 absolute  opacity-0 ease-in-out duration-300 translate-x-full bg-slate-900"}>
            <div className="flex items-center text-3xl" >
                <div className="text-3xl hover:cursor-pointer mr-8" onClick={handleClose}>x</div>
                <div className="ml-10">Profile Info</div>
            </div>
            <div className="flex justify-center mt-6">
                <img onClick={()=>{setOpenModal(true)}} style={{height : "15rem" , width : "15rem"}} className="hover:cursor-pointer rounded-full ml-8" src={currentChat.profilePic} alt="" />
            </div>
            <div className="text-center m-2 text-2xl ml-8">{currentChat.username}</div>
            
        </div>
    )
}