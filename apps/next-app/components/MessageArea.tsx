"use client"

import { currentChatAtom, LoggedInUserAtom } from "@/state"
import { useRecoilValue } from "recoil"
import { MessageTemplate } from "./MessageTemplate"
import { MessageType } from "./ChatArea"
import { useEffect, useRef } from "react"

export const MessageArea = ()=>{

    const bottomOfChatRef = useRef<HTMLDivElement>(null)
    const currentChat = useRecoilValue(currentChatAtom)
    const loggedInUserSession = useRecoilValue<any>(LoggedInUserAtom);



    useEffect(()=>{
        if(bottomOfChatRef.current){
            bottomOfChatRef.current.scrollIntoView()
          }
    },[currentChat.chats , currentChat])

    return (
        <div style={{height : "37rem"}} className="bg-slate-900 flex gap-4 flex-col px-4 pt-4 pb-0 w-full overflow-y-auto">
            {currentChat.chats.map((msg : MessageType , index)=>{
                return <MessageTemplate
                key={index}
                data={msg.data}
                toProfileId={msg.toProfileId}
                fromProfileId={msg.fromProfileId}
                loggedInProfileId={loggedInUserSession.user.profileId}
                />
            })}
            <div style={{padding : "0px" , margin : "0px"}} className="" ref={bottomOfChatRef}></div>
        </div>
    )
}