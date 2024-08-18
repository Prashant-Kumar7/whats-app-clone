"use client"

import { useEffect, useState } from "react";
import { ChatArea, MessageType } from "./ChatArea"
import { DmList } from "./DmList"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { chatsAtomFamily, currentChatAtom, onlineIdsAtom, resAtom } from "@/state";
import { MessageTemplate } from "./MessageTemplate";


export const ChatPage = ( { chatList , loggedInUserSession } : any)=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const setOnlineIds = useSetRecoilState(onlineIdsAtom)
    const [currentChat, setCurrentChat ]= useRecoilState(currentChatAtom)
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const [input, setInput] = useState("")
    const [id , setId] = useState("")
    const [chatsAtom, setChatsAtom] = useRecoilState(chatsAtomFamily(id))
    const [response, setRes] = useRecoilState(resAtom)
    

    const status = onlineIds.find((id)=>{
        if(id === currentChat.profileId){
            return true
        }
        return false
    })
    
    
    var timer : any


    function startConnection(){
        const newSocket = new WebSocket('ws://localhost:8080');
        newSocket.onopen = () => {
            const init_conn = {
                type : "init_conn",
                profileId : loggedInUserSession.user.profileId,
                chatsList : chatList
            }
            newSocket.send(JSON.stringify(init_conn));
            const chats : any[] = [];
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

    useEffect(()=>{
        setChatsAtom((prev)=>{
            return {
                profileId : id,
                chatMessages : [...prev.chatMessages , response]
            }
        })
    },[id])


    if(socket){

        socket.onmessage = (message) => {

            const res = JSON.parse(message.data)

            if(res.type === "getUsersStatus"){
                if(res.profileId === loggedInUserSession.user.profileId){
                    setOnlineIds(res.onlineIds)
                }
            }

            if(res.type === "Message"){

                setId(res.fromProfileId)
                setRes(res)
                setChatsAtom((prevChats : any)=>{
                        return {
                        profileId : res.fromProfileId,
                        chatMessages : [...prevChats.chatMessages , res]
                        }
                })

                if(res.fromProfileId === currentChat.profileId){
                    setCurrentChat((prev)=>{
                        return {
                            ...prev,
                            chats : [...prev.chats , res]
                        }
                    })
                }
            }
        }
    }

    


    function handleSend(){
        
        const data = {
            type : "Message",
            data : input,
            toProfileId : currentChat.profileId,
            fromProfileId : loggedInUserSession.user.profileId
        }

        if(socket){
            socket.send(JSON.stringify(data))
            setId(data.toProfileId)
            setRes(data)

            setChatsAtom((prevChats : any)=>{
                    return {
                        ...prevChats,
                        chatMessages : [...prevChats.chatMessages , data]
                    }
            })
            if(data.toProfileId === currentChat.profileId){
                setCurrentChat((prev)=>{
                    return {
                        ...prev,
                        chats : [...prev.chats , data]
                    }
                })
            }


            

        }
        setInput("");
    }


    function handleChange(e: any){
        setInput(e.target.value)
    }


    return (
        <div className='grid grid-cols-9 h-screen w-screen p-6'>
      <DmList res = {response} id={id} chatList={chatList} loggedInUserSession={loggedInUserSession}/>
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

                {currentChat.chats.map((msg : MessageType , index)=>{
                    return <MessageTemplate
                    key={index}
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
    </div>
    )
}