"use client"

import { chatsAtomFamily, currentChatAtom } from "@/state"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

interface Chats {
    username : string
    profilePic : string
    profileId : string
    status : any
    chats : any[]
}

export const Chats = ({username , profilePic, profileId, status} : any)=>{

    const setCurrentChat = useSetRecoilState<Chats>(currentChatAtom);
    const chatsAtom = useRecoilValue(chatsAtomFamily(profileId))
    function handleClick(){
        setCurrentChat({
            username : username,
            profileId : chatsAtom.profileId,
            profilePic : profilePic,
            status : status,
            chats : chatsAtom.chatMessages
        })
    }

    

    return (
        <div onClick={handleClick} className="p-4 flex border-b gap-4 border-slate-700">
            {status ? <div style={{height : "0.66rem" , width : "0.66rem" , marginLeft : "-10px"}} className="rounded-full bg-green-600 relative left-14 top-7"></div> : <div></div> }
            
            <img className="rounded-full w-10 h-10" src={profilePic} alt="" />
            {/* {chatsAtom.profileId} */}
            <div className="flex flex-col">
                <span>{username}</span>
                {status? <span className="text-green-500 text-sm">online</span> : <span className="text-gray-500 text-sm">offline</span>}
            </div>
        </div>
    )
}