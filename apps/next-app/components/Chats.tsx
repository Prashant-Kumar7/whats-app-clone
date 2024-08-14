"use client"

import { currentChatAtom } from "@/state"
import { useSetRecoilState } from "recoil"

interface Chats {
    username : string
    profilePic : string
    profileId : string
    chats : any
}

export const Chats = ({username , profilePic, profileId, chats} : Chats)=>{

    const setCurrentChat = useSetRecoilState<Chats>(currentChatAtom);
    function handleClick(){
        setCurrentChat({
            username : username,
            profileId : profileId,
            profilePic : profilePic,
            chats : chats
        })
    }

    return (
        <div onClick={handleClick} className="p-6 flex border-b gap-4 border-slate-700">
                <img className="rounded-full w-8 h-8" src={profilePic} alt="" />
            <span>{username}</span>
        </div>
    )
}