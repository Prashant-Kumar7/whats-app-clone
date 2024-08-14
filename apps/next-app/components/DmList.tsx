"use client"

import { useEffect, useState } from "react"
import { Chats } from "./Chats";
import { ChatArea } from "./ChatArea";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState } from "recoil";
import { dmListAtom } from "@/state";


interface ListType {
    id: string;
    userName: string;
    profileId: string;
    chats: string[];
}

interface ChatListType {
    chatList : SingleProfileType[]
}

export const DmList = ({chatList} : any )=>{

    // const [chatsList , setChatsList] = useState<ChatArea[]>([]);
    
    useEffect(()=>{
        setDmList(chatList)
    })
    const [DmList ,setDmList] = useRecoilState(dmListAtom);

    return (
        <div className='flex flex-col col-span-3 bg-slate-900 border-r border-gray-600 rounded-l-sm'>
            <div className="border-b border-slate-700 p-6">
                <span className="text-3xl">Chats</span>
            </div>
            {DmList.map((chat :SingleProfileType, index: number)=>{
                return (
                    <Chats
                    key={index}
                    username={chat.username}
                    profilePic={chat.profilePic}
                    profileId={chat.id}
                    chats={[]}
                    // setChat = {setSelectedChat}
                    />
                )
            })}
      </div>
    )
}