"use client"

import { useEffect, useState } from "react"
import { Chats } from "./Chats";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState, useRecoilValue } from "recoil";
import { dmListAtom, onlineIdsAtom } from "@/state";





export const DmList = ({chatList , loggedInUserSession , ws} : any )=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [DmList ,setDmList] = useRecoilState(dmListAtom);
    const onlineIds = useRecoilValue(onlineIdsAtom)

    useEffect(() => {
        setDmList(chatList)
        setSocket(ws)
    }, [])


    return (
        <div className='flex flex-col col-span-3 bg-slate-900 border-r border-gray-600 rounded-l-sm'>
            <div className="border-b border-slate-700 p-6">
                <span className="text-3xl">Chats</span>
            </div>
            {DmList.map((chat :SingleProfileType, index: number)=>{

                const status = onlineIds.find((x : string)=>{
                    if(chat.id === x){
                        return true
                    } 
                    return false
                })

                return (
                    <Chats
                    key={index}
                    username={chat.username}
                    profilePic={chat.profilePic}
                    profileId={chat.id}
                    chats={[]}
                    status = {status}
                    />
                )
            })}
      </div>
    )
}