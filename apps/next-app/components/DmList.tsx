"use client"

import { useEffect, useState } from "react"
import { Chats } from "./Chats";
import { ChatArea } from "./ChatArea";

interface SelectedChatType {
    setSelectedChat : Function
    chatList : ChatArea[]
}

export const DmList = ({setSelectedChat , chatList} : SelectedChatType )=>{

    const [chatsList , setChatsList] = useState<ChatArea[]>([]);

    useEffect(()=>{
        setChatsList(chatList)
    })


    return (
        <div className='flex flex-col col-span-3 bg-slate-900 border-r border-gray-600 rounded-l-sm'>
            <div className="border-b border-slate-700 p-6">
                <span className="text-3xl">Chats</span>
            </div>
            {chatsList.map((chats, index)=>{
                return (
                    <Chats
                    key={index}
                    name={chats.name}
                    setChat = {setSelectedChat}
                    />
                )
            })}
      </div>
    )
}