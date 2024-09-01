"use client"

import { useEffect, useRef, useState } from "react";
import { ChatArea, MessageType } from "./ChatArea"
import { DmList } from "./DmList"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { acceptCallAtom, callVisibleAtom, chatsAtomFamily, connectedAtom, currentChatAtom,  currentProfileCallAtom,  disconnectAtom,  dmListAtom,  incommingCallAtom,  initCallAtom,  LoggedInUserAtom,  missedCallAtom,  onlineIdsAtom, profileInfoAtom, rejectCallAtom, resAtom, sendAtom, settingsAtom, typingAtom, updateAtom, viewProfilePicAtom } from "@/state";
import { MessageTemplate } from "./MessageTemplate";
import { AccSettings } from "./AccSettings";
import { ChatHeader } from "./ChatHeader";
import axios from "axios";
import { MessageArea } from "./MessageArea";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ProfileInfo } from "./ProfileInfo";
import { LandingChatArea } from "./LandingChatArea";
import { IncommingCall } from "./IncommingCall";
import { Calling } from "./Calling";
import { Connected } from "./Connected";


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
    const [pc , setPC] = useState<RTCPeerConnection | null>(null)
    const [initCall ,setInitCall] = useRecoilState(initCallAtom)
    const [CallVisiblity , setCallVisiblity] = useRecoilState(callVisibleAtom)
    const [incommingCall , setIncommingCall] = useRecoilState(incommingCallAtom)
    const [currentProfileCall, setCurrentProfileCall] = useRecoilState(currentProfileCallAtom)
    const [acceptCall , setAcceptCall] = useRecoilState(acceptCallAtom)
    const [rejectCall , setRejectCall] = useRecoilState(rejectCallAtom)
    const [callEnded, setCallEnded] = useRecoilState(missedCallAtom)
    const [connected , setConnected] = useRecoilState(connectedAtom)
    const [disconnect, setDisconnect] = useRecoilState(disconnectAtom)


    if(loggedInUserSession.user){
        setCurrentUser(loggedInUserSession.user)
    }

    
    // var incommingTimer : any
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
        newPC()

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
            // console.log(res)

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

            if(res.type === "init_call"){
                const callingProfile = chatList.find((chat : any)=>{
                    if(chat.id === res.profileId){
                        return chat;
                    } else {
                        return null
                    }
                })
                if(callingProfile){
                    setCurrentProfileCall({
                        profileId : callingProfile.id,
                        username : callingProfile.username,
                        profilePic : callingProfile.profilePic
                    })
                }

                

                setIncommingCall(true)
                
            }


            if(res.type === "notConnected"){
                // setRejectCall(true)
                console.log("inside not connected")
                console.log(res.type)
                setIncommingCall(false)
                setInitCall(false)
                setCallVisiblity(false)
            }


            if(res.type === "callEnded"){
                setIncommingCall(false)
            }


            if(res.type ==="connected"){
                console.log("connected")
                setConnected(true)
                setIncommingCall(false)
                setInitCall(false)
                setCallVisiblity(false)
                // setInitCall(true)/
            }

            if(res.type === "disconnected"){
                setConnected(false)
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

    function newPC(){
        const pc = new RTCPeerConnection()
        setPC(pc)
        // startReceiving()
    }


    if(acceptCall&&socket){
        socket.send(JSON.stringify({type : "callAccpeted" , profileId : currentProfileCall.profileId}))
        setAcceptCall(false)
    }

    if(rejectCall && socket){
        socket.send(JSON.stringify({type : "callRejected" , profileId : currentProfileCall.profileId}))
        setRejectCall(false)
    }
    

    function handleKeyDown(e : any){
        if(e.key === "Enter"){
            handleSend()
        }
    }

    if(initCall &&socket){
        socket.send(JSON.stringify({type : "init_call" , profileId : currentProfileCall.profileId}))
    }

    if(callEnded && socket){
        socket.send(JSON.stringify({type : "callEnded" , profileId : currentProfileCall.profileId}))
        setCallEnded(false)
        setInitCall(false);
        setCallVisiblity(false)
    }

    if(disconnect && socket){
        socket.send(JSON.stringify({type : "disconnected", profileId : currentProfileCall.profileId}))
        setDisconnect(false)
    }

    return (
        <div className='grid grid-cols-9 h-screen w-screen p-6'>
      <DmList res = {response} id={id} chatList={chatList} loggedInUserSession={loggedInUserSession}/>
      {incommingCall ? <IncommingCall comein={true}/> : connected ? <Connected/> : <div className="hidden"></div>}
      
      {CallVisiblity ? <Calling comein={true}/> : connected ? <Connected/> : <div className="hidden"></div>}
        {settings ? <AccSettings comein={true} /> : <AccSettings  comein={false}/>}
      {currentChat.profileId?
      <div style={{height: "100%" , width: "100%"}} className={profileInfoView? 'col-span-4 bg-slate-900 rounded-r-sm ease-in-out duration-500' : 'col-span-6 bg-slate-900 rounded-r-sm ease-in-out duration-500'}>
   
            <ChatHeader/>

            <MessageArea loggedInUserProfileId={loggedInUserSession.user.profileId}/>

            {/* {input field} */}
            <div className=" flex justify-center p-4 gap-2 bg-slate-800">
                <input tabIndex={-1} onChange={handleChange} onKeyDown={handleKeyDown} value={input} className="p-2 bg-slate-700 rounded-lg border-x-0 border-y-0 focus:ring-0 focus:outline-none border-slate-300 focus:caret-slate-500" style={{width : "93%" , height : "2.75rem"}} placeholder="Text message" type="text" />
                <button onClick={handleSend} className="bg-slate-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#94A3B8"
                        strokeMiterlimit="10"
                        strokeWidth="0"
                        d="M0 14.69L0 39.65 51 45 0 50.35 0 75.31 90 45z"
                        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                      ></path>
                    </svg>
                </button>
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