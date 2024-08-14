"use client"

import { currentChatAtom } from "@/state"
import { useRecoilValue } from "recoil"
import { MessageTemplate } from "./MessageTemplate"

export interface ChatArea {
    name : string | undefined
}

export const ChatArea = ()=>{


    const currentChat = useRecoilValue(currentChatAtom)

    return (
        <div style={{height: "100%" , width: "100%"}} className='grid grid-rows-12 col-span-6 bg-slate-900 rounded-r-sm'>
            {/* {chat header} */}
            <div className="p-2 pl-4 row-span-1 flex border-b items-center border-gray-700">
                <img className="rounded-full w-11 h-11 mr-8" src={currentChat.profilePic} alt="" />
                <div>
                    <span className="text-xl text-gray-200">{currentChat.username}</span>
                </div>
            </div>
            {/* {message area} */}
            <div  className="row-span-10 bg-slate-900 flex gap-4 flex-col p-4">

                {currentChat.chats.map((msg)=>{
                    return <MessageTemplate/>
                })}
            </div>

            {/* {input field} */}
            <div className="row-span-1 flex p-2 gap-2 border-t border-gray-700">
                <input className="p-2 bg-slate-800 rounded-lg" style={{width : "93%" , height : "100%"}} placeholder="Text message" type="text" />
                <button className="bg-slate-800 p-2 rounded-lg">send</button>
            </div>
      </div>
    )
}