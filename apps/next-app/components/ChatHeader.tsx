"use client"

import { currentChatAtom, onlineIdsAtom, profileInfoAtom, typingAtom } from "@/state"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export const ChatHeader = ()=>{
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const [currentChat , setCurrentChat] = useRecoilState(currentChatAtom)
    const setProfileInfoView = useSetRecoilState(profileInfoAtom)


    const status = onlineIds.find((id)=>{
        if(id === currentChat.profileId){
            return true
        }
        return false
    })
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          setCurrentChat((prev : any)=>{
            return {
                ...prev,
                typing : false
            }
          })

        }, 500)
        
        return () => clearTimeout(delayDebounceFn)
    }, [currentChat.typing])

    function handleProfileView(){
        setProfileInfoView(true)
    }

    return (
        <div onClick={handleProfileView} className="p-2 pl-4 flex border-b items-center hover:cursor-pointer border-gray-700">
            <img className="rounded-full w-11 h-11 mr-8" src={currentChat.profilePic} alt="" />
            <div className="flex flex-col">
                <span className="text-md text-gray-200">{currentChat.username}</span>
                {!status? <span className="text-gray-500 text-sm">offline</span> : currentChat.typing ? <span className="text-green-500 text-sm font-semibold">typing...</span> : <span className="text-green-500 text-sm">online</span>}
            </div>
        </div>
    )
}