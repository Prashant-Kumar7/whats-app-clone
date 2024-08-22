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
    typing : any
}

export const Chats = ({username , profilePic, profileId, status} : any)=>{

    const [currentChat , setCurrentChat] = useRecoilState<Chats>(currentChatAtom);
    const [chatsAtom , setChatsAtom] = useRecoilState(chatsAtomFamily(profileId))


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          setChatsAtom((prev : any)=>{
            return {
                ...prev,
                typing : false
            }
          })

        }, 500)
        
        return () => clearTimeout(delayDebounceFn)
    }, [chatsAtom.typing])



    function handleClick(){
        setCurrentChat({
            username : username,
            profileId : chatsAtom.profileId,
            profilePic : profilePic,
            status : status,
            chats : chatsAtom.chatMessages,
            typing : chatsAtom.typing
        })

        setChatsAtom((prev)=>{
            return {
                ...prev,
                unseen : false,
                count : 0
            }
        })
    }

    

    return (
        <div onClick={handleClick} className={ currentChat.profileId === profileId ? "p-4 flex justify-between bg-slate-800 border-b border-slate-700" : "p-4 flex border-b justify-between border-slate-700" }>
            <div className="flex gap-4">
                {status ? <div style={{height : "0.66rem" , width : "0.66rem" , marginLeft : "-10px"}} className="rounded-full bg-green-600 relative left-14 top-7"></div> : <div></div> }

                <img className="rounded-full w-10 h-10" src={profilePic} alt="" />
                {/* {chatsAtom.profileId} */}
                <div className="flex flex-col mr-8">
                    <span>{username}</span>
                    {!status? <span className="text-gray-500 text-sm">offline</span> : chatsAtom.typing ? <span className="text-green-500 text-sm font-semibold">typing...</span> : <span className="text-green-500 text-sm">online</span>}

                </div>
            </div>
            {chatsAtom.unseen? <div style={{width : "25px" , height : "25px"}} className="p-2 bg-green-600 text-gray-300 text-sm mt-4 rounded-full text flex justify-center items-center">{chatsAtom.count}</div> : <div></div>}
        </div>
    )
}