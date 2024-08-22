"use client"

import { useEffect, useRef, useState } from "react";
import { ChatArea, MessageType } from "./ChatArea"
import { DmList } from "./DmList"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { chatsAtomFamily, currentChatAtom,  dmListAtom,  LoggedInUserAtom,  onlineIdsAtom, profileInfoAtom, resAtom, sendAtom, settingsAtom, typingAtom, updateAtom, viewProfilePicAtom } from "@/state";
import { MessageTemplate } from "./MessageTemplate";
import { AccSettings } from "./AccSettings";
import { ChatHeader } from "./ChatHeader";
import axios from "axios";
import { MessageArea } from "./MessageArea";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ProfileInfo } from "./ProfileInfo";
import { LandingChatArea } from "./LandingChatArea";

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
    const profileInfoView = useRecoilValue(profileInfoAtom)
    const setDmList = useSetRecoilState(dmListAtom)
    const [openModal, setOpenModal] = useRecoilState(viewProfilePicAtom)
    const [typing, setTyping] = useRecoilState(typingAtom)
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




// This useEffect is used to listen to typing profiles
    useEffect(()=>{
        if(typing.typing){
            setChatsAtom((prev :any)=>{
                return {
                    ...prev,
                    typing : typing.typing
                }
            })
            if(typing.profileId === currentChat.profileId){
                setCurrentChat((prev : any)=>{
                    return {
                        ...prev,
                        typing : typing.typing
                    }
                })
            }

            setTyping({
                typing : false,
                profileId : ""
            })

        }
    },[id , incomming])


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

            if(res.type === "typing"){
                setTyping({
                    typing : true,
                    profileId : res.profileId
                })
                setIncomming(true)
                setId(res.profileId)
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
        const typeObj = {
            type : "Typing",
            profileId : currentChat.profileId
        }
        if(socket && input!==""){
          socket.send(JSON.stringify(typeObj))
        }
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
      {currentChat.profileId?<div style={{height: "100%" , width: "100%"}} className={profileInfoView? 'col-span-4 bg-slate-900 rounded-r-sm ease-in-out duration-500' : 'col-span-6 bg-slate-900 rounded-r-sm ease-in-out duration-500'}>
   
            <ChatHeader/>

            <MessageArea loggedInUserProfileId={loggedInUserSession.user.profileId}/>

            {/* {input field} */}
            <div className=" flex p-4 gap-2 bg-slate-800">
                <input tabIndex={-1} onChange={handleChange} onKeyDown={handleKeyDown} value={input} className="p-2 bg-slate-700 rounded-lg border-x-0 border-y-0 focus:ring-0 focus:outline-none border-slate-300 focus:caret-slate-500" style={{width : "93%" , height : "2.75rem"}} placeholder="Text message" type="text" />
                <button onClick={handleSend} className="bg-slate-700 p-2 rounded-lg">send</button>
            </div>
      </div> : <LandingChatArea/>}
      <div className={profileInfoView ? "bg-slate-900 col-span-2" : "hidden"}></div>
      {profileInfoView ? <ProfileInfo comein={true} /> : <ProfileInfo  comein={false}/>}

      <Modal show={openModal} style={{overflow: "hidden"}} className="backdrop-blur-sm bg-gray/30 p-0 border-0 overscroll-none" onClose={() => setOpenModal(false)} popup>
            {/* <Modal.Header /> */}
            <span onClick={()=>setOpenModal(false)} style={{marginBottom : "0px"}} className="flex justify-end text-3xl absolute right-0 hover:cursor-pointer">X</span>
            <Modal.Body className="flex justify-center p-0 border-0">
              <img style={{width : "43rem" , height : "48rem"}} src={currentChat.profilePic} alt="" />
            </Modal.Body>
          </Modal>
    </div>
    )
}