"use client"

import { currentChatAtom, onlineIdsAtom, profileInfoAtom } from "@/state"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const ChatHeader = ()=>{
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const currentChat = useRecoilValue(currentChatAtom)
    const setProfileInfoView = useSetRecoilState(profileInfoAtom)
    const status = onlineIds.find((id)=>{
        if(id === currentChat.profileId){
            return true
        }
        return false
    })


    function handleProfileView(){
        setProfileInfoView(true)
    }

    return (
        <div onClick={handleProfileView} className="p-2 pl-4 flex border-b items-center hover:cursor-pointer border-gray-700">
            <img className="rounded-full w-11 h-11 mr-8" src={currentChat.profilePic} alt="" />
            <div className="flex flex-col">
                <span className="text-md text-gray-200">{currentChat.username}</span>
                {status? <span className="text-green-500 text-sm">online</span> : <span className="text-gray-500 text-sm">offline</span> }
            </div>
        </div>
    )
}