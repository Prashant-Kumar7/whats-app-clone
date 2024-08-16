"use client"

import { useEffect, useState } from "react";
import { ChatArea } from "./ChatArea"
import { DmList } from "./DmList"
import { useSetRecoilState } from "recoil";
import { onlineIdsAtom } from "@/state";

export const ChatPage = ( { chatList , loggedInUserSession } : any)=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const setOnlineIds = useSetRecoilState(onlineIdsAtom)


    var timer : any


    function startConnection(){
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
            const init_conn = {
                type : "init_conn",
                profileId : loggedInUserSession.user.profileId
            }
            newSocket.send(JSON.stringify(init_conn));

          
            const getUsersStatus = {
                type : "getUsersStatus"
            }
            timer = setInterval(()=>{
                newSocket.send(JSON.stringify(getUsersStatus));
            }, 2000)

        }
        
        setSocket(newSocket);

    }


    useEffect(() => {
        startConnection()

        return () =>{
            const close_conn = {
                type : "close_conn"
            }
            clearInterval(timer)
            socket?.send(JSON.stringify(close_conn))
        };
    }, [])


    if(socket){
        socket.onmessage = (message) => {

            const res = JSON.parse(message.data)

            if(res.type === "getUsersStatus"){
                if(res.profileId === loggedInUserSession.user.profileId){
                    setOnlineIds(res.onlineIds)
                }
            }

            if(res.type === "message"){
                
            }
        }
    }


    return (
        <div className='grid grid-cols-9 h-screen w-screen p-6'>
      <DmList chatList={chatList} loggedInUserSession={loggedInUserSession} ws={socket}/>
      <ChatArea ws = {socket}/>
    </div>
    )
}