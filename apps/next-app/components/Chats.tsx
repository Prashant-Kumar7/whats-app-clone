"use client"

import { currentChatAtom } from "@/state"
import { useSetRecoilState } from "recoil"

interface Chats {
    username : string
    profilePic : string
    profileId : string
    chats : any
    status : any
}

export const Chats = ({username , profilePic, profileId, chats, status} : Chats)=>{

    const setCurrentChat = useSetRecoilState<Chats>(currentChatAtom);
    function handleClick(){
        // setCurrentChat({
        //     username : username,
        //     profileId : profileId,
        //     profilePic : profilePic,
        //     chats : chats,
        //     status : status
        // })
    }

    return (
        <div onClick={handleClick} className="p-6 flex border-b gap-4 border-slate-700">
            <img className="rounded-full w-8 h-8" src={profilePic} alt="" />
            <div className="flex flex-col">
                <span>{username}</span>
                {status? <span>online</span> : <span>offline</span>}
                {/* <span>{status}</span> */}
            </div>
        </div>
    )
}