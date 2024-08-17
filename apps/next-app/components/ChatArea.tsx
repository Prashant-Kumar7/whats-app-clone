"use client"

import { currentChatAtom, onlineIdsAtom } from "@/state"
import { useRecoilValue } from "recoil"
import { MessageTemplate } from "./MessageTemplate"
import { useEffect, useState } from "react"

export interface ChatArea {
    name : string | undefined
}

interface ChatAreaPropsType {
    receiveMessageFn :any
    tempChats : MessageType[]
}


export interface MessageType {
    type : string
    toProfileId : string
    data : string
    fromProfileId : string
}

export const ChatArea = ({receiveMessageFn, tempChats ,sendMessageFn ,loggedInUserSession} :any)=>{


    const [chats , setChats] = useState<MessageType[]>([])
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const currentChat = useRecoilValue(currentChatAtom)
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const [input, setInput] = useState("")
    const status = onlineIds.find((id)=>{
        if(id === currentChat.profileId){
            return true
        }
        return false
    })

    useEffect(()=>{
        setChats((prevChats)=>{
            return [...prevChats, tempChats]
        })
    }, [tempChats])
    // receiveMessageFn(setChats)


    function handleChange(e: any){
        setInput(e.target.value)
    }

    function handleSend(){

        const data = {
            type : "Message",
            data : input,
            toProfileId : currentChat.profileId,
            fromProfileId : loggedInUserSession.user.profileId
        }

        sendMessageFn(data , setChats)
        
        setInput("");
    }

    


    return (
        <div style={{height: "100%" , width: "100%"}} className='grid grid-rows-12 col-span-6 bg-slate-900 rounded-r-sm'>
            {/* {chat header} */}
            <div className="p-2 pl-4 row-span-1 flex border-b items-center border-gray-700">
                <img className="rounded-full w-11 h-11 mr-8" src={currentChat.profilePic} alt="" />
                <div className="flex flex-col">
                    <span className="text-md text-gray-200">{currentChat.username}</span>
                    {status? <span className="text-green-500 text-sm">online</span> : <span className="text-gray-500 text-sm">offline</span> }
                </div>
            </div>
            {/* {message area} */}
            <div  className="row-span-10 bg-slate-900 flex gap-4 flex-col p-4">

                {chats.map((msg : MessageType)=>{
                    return <MessageTemplate
                    data={msg.data}
                    toProfileId={msg.toProfileId}
                    fromProfileId={msg.fromProfileId}
                    loggedInProfileId={loggedInUserSession.user.profileId}
                    />
                })}
            </div>

            {/* {input field} */}
            <div className="row-span-1 flex p-2 gap-2 border-t border-gray-700">
                <input onChange={handleChange} value={input} className="p-2 bg-slate-800 rounded-lg" style={{width : "93%" , height : "100%"}} placeholder="Text message" type="text" />
                <button onClick={handleSend} className="bg-slate-800 p-2 rounded-lg">send</button>
            </div>
      </div>
    )
}