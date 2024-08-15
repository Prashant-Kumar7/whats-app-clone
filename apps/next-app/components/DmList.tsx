"use client"

import { useEffect, useState } from "react"
import { Chats } from "./Chats";
import { ChatArea } from "./ChatArea";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState } from "recoil";
import { dmListAtom } from "@/state";





export const DmList = ({chatList} : any )=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [online, setOnline] = useState(false)

    
    function startConnection(){
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
          console.log('Connection established');
          newSocket.send('Hello Server!');
        }
        newSocket.onmessage = (message) => {
          console.log('Message received:', message.data);
        }
        setSocket(newSocket);

    }


    useEffect(() => {
        // startConnection()
        setOnline(true)
        return () =>{
            setOnline(false)
            if(socket){
                socket.close()
            }
        };
    }, [])




    useEffect(()=>{
          setDmList(chatList)
    })
    const [DmList ,setDmList] = useRecoilState(dmListAtom);

    if(socket){
        console.log(socket)
    }


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