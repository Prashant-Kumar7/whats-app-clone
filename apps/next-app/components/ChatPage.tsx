"use client"

import { useEffect, useRef, useState } from "react";
import { ChatArea, MessageType } from "./ChatArea"
import { DmList } from "./DmList"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { chatsAtomFamily, currentChatAtom,  dmListAtom,  LoggedInUserAtom,  onlineIdsAtom, resAtom, sendAtom, settingsAtom, updateAtom } from "@/state";
import { MessageTemplate } from "./MessageTemplate";
import { AccSettings } from "./AccSettings";
import { ChatHeader } from "./ChatHeader";
import axios from "axios";

interface ChatAtomPrevType {
    profileId : string
    chatMessages : any[]
    count : number
    unseen : boolean
}


export const ChatPage = ( { chatList , loggedInUserSession } : any)=>{

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const setOnlineIds = useSetRecoilState(onlineIdsAtom)
    const [currentChat, setCurrentChat ]= useRecoilState(currentChatAtom)
    const [input, setInput] = useState("")
    const [id , setId] = useState("")
    const  setChatsAtom = useSetRecoilState(chatsAtomFamily(id))
    const [response, setRes] = useRecoilState(resAtom)
    const [send , setSend] = useRecoilState(sendAtom)
    const bottomOfChatRef = useRef<HTMLDivElement>(null)
    const [incomming, setIncomming] = useState(false)
    const [outgoing, setOutgoing] = useState(false)
    const settings = useRecoilValue(settingsAtom)
    const setCurrentUser = useSetRecoilState(LoggedInUserAtom)
    const [UpdateAtom,setUpdateAtom] = useRecoilState(updateAtom)
    const [sendReq , setSendReq] = useState(false)
    const setDmList = useSetRecoilState(dmListAtom)
    if(loggedInUserSession.user){
        setCurrentUser(loggedInUserSession.user)
    }
    
    
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
            
        }
        setSocket(newSocket);
    }


    useEffect(() => {
        startConnection()
        setCurrentUser(loggedInUserSession)
        return () =>{
            const close_conn = {
                type : "close_conn"
            }
            clearInterval(timer)
            socket?.send(JSON.stringify(close_conn))
        };
    }, [])


// handling update of user in other clients Browser
    useEffect(()=>{
        if(UpdateAtom && socket){
            const data = {
                type : "Update"
            }

            socket.send(JSON.stringify(data))
            setUpdateAtom(false)
        }

       if(sendReq){
            axios.get("http://localhost:3000/api/DmList").then((res)=>{
                const response = res.data;
                // console.log(response)
                setDmList(response)

                response.find((profile :any)=>{
                    if(profile.id === currentChat.profileId){
                        setCurrentChat((prev)=>{
                            return {
                                ...prev,
                                username : profile.username,
                                profilePic : profile.profilePic
                            }
                        })
                        return;
                    }
                })

                setSendReq(false)
            })
       }

    },[UpdateAtom , sendReq])


// handling message distribution in this useEffect
    useEffect(()=>{
        if(send.send){
            setChatsAtom((prev)=>{
                return {
                    ...prev,
                    chatMessages : [...prev.chatMessages, send.send],
                    profileId : id,
                    unseen : false,
                    count : 0,

                }
            })
        }

        

        if(response.response){
            setChatsAtom((prev)=>{
                return {
                    ...prev,
                    chatMessages : [...prev.chatMessages, response.response],
                    profileId : id,
                    unseen : true,
                    count : prev.count + 1
                }
            })

            if(currentChat.profileId === response.fromProfileId){
                setChatsAtom((prev)=>{
                    return {
                        ...prev,
                        unseen : false,
                        count : 0,
    
                    }
                })
            }
        }

        setRes(()=>{
            return {
                response : null,
                fromProfileId : ""
            }
        })


        setSend(()=>{
            return {
                send : null,
                fromProfileId : ""
            }
        })
        setIncomming(false)
        setOutgoing(false)
    },[id , incomming , outgoing])

//socket operations like sending and reciving
    if(socket){

        socket.onmessage = (message) => {

            const res = JSON.parse(message.data)

            if(res.type === "getUsersStatus"){
                if(res.profileId === loggedInUserSession.user.profileId){
                    setOnlineIds(res.onlineIds)
                }
            }

            if(res.type === "Message"){
                setIncomming(true)
                setId(res.fromProfileId)
                setRes((prev)=>{
                   return { 
                    ...prev,
                    response : res,
                    fromProfileId : res.fromProfileId
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


            if(res.type === "updateOccured"){
                setSendReq(true)
            }
        }
    }

    


    function handleSend(){
        setOutgoing(true)
        const data = {
            type : "Message",
            data : input,
            toProfileId : currentChat.profileId,
            fromProfileId : loggedInUserSession.user.profileId
        }

        if(socket && input!==""){
            socket.send(JSON.stringify(data))
            setId(data.toProfileId)
            setSend((prev)=>{
                return {
                    ...prev,
                    send : data,
                    fromProfileId : data.fromProfileId
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


    useEffect(()=>{
        if(bottomOfChatRef.current){
            bottomOfChatRef.current.scrollIntoView()
          }
    },[currentChat.chats , currentChat])


    function handleChange(e: any){
        setInput(e.target.value)
    }


    function handleKeyDown(e : any){
        if(e.key === "Enter"){
            handleSend()
        }
    }

    return (
        <div className='grid grid-cols-9 h-screen w-screen p-6'>
      <DmList res = {response} id={id} chatList={chatList} loggedInUserSession={loggedInUserSession}/>
        {settings ? <AccSettings comein={true} /> : <AccSettings  comein={false}/>}
      <div style={{height: "100%" , width: "100%"}} className='col-span-6 bg-slate-900 rounded-r-sm'>
            {/* {chat header} */}
            <ChatHeader/>
            {/* {message area} */}
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

            {/* {input field} */}
            <div className=" flex p-4 gap-2 border-t border-gray-700">
                <input tabIndex={-1} onChange={handleChange} onKeyDown={handleKeyDown} value={input} className="p-2 bg-slate-800 rounded-lg border-x-0 border-y-0 focus:ring-0 focus:outline-none border-slate-300 focus:caret-slate-500" style={{width : "93%" , height : "2.75rem"}} placeholder="Text message" type="text" />
                <button onClick={handleSend} className="bg-slate-800 p-2 rounded-lg">send</button>
            </div>
      </div>
    </div>
    )
}