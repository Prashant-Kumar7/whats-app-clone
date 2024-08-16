"use client"

import { useEffect, useState } from "react"
import { Chats } from "./Chats";
import { ChatArea } from "./ChatArea";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState } from "recoil";
import { dmListAtom, onlineIdsAtom } from "@/state";





export const DmList = ({chatList , loggedInUserSession} : any )=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    // const [online, setOnline] = useState(false)
    const [DmList ,setDmList] = useRecoilState(dmListAtom);
    const [onlineIds, setOnlineIds] = useRecoilState(onlineIdsAtom)

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
        setDmList(chatList)
        startConnection()

        return () =>{
            // console.log("DmList unmounted")
            const close_conn = {
                type : "close_conn"
            }
            clearInterval(timer)
            socket?.send(JSON.stringify(close_conn))
        };
    }, [])


    // window.addEventListener("unload", function () {
    //     const close_conn = {
    //         type : "close_conn"
    //     }

    //     if(socket){
    //         if(socket.readyState == WebSocket.OPEN)
    //             socket.send(JSON.stringify(close_conn))
    //     }
    // });

    if(socket){
        socket.onmessage = (message) => {
            const res = JSON.parse(message.data)
            if(res.profileId === loggedInUserSession.user.profileId){
                // console.log('Message received: ', res.onlineIds);
                setOnlineIds(res.onlineIds)
            }
        }
    }

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
                    // setChat = {setSelectedChat}
                    />
                )
            })}
      </div>
    )
}