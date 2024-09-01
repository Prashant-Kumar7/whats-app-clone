"use client"

import { callVisibleAtom, currentChatAtom, currentProfileCallAtom, initCallAtom, onlineIdsAtom, profileInfoAtom, typingAtom } from "@/state"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export const ChatHeader = ()=>{
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const [currentChat , setCurrentChat] = useRecoilState(currentChatAtom)
    const setProfileInfoView = useSetRecoilState(profileInfoAtom)
    const [initCall, setInitCall] = useRecoilState(initCallAtom)
    const setCurrentProfileCall = useSetRecoilState(currentProfileCallAtom);
    const setCallVisiblity = useSetRecoilState(callVisibleAtom)

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

    function handleInitCall(){
        if(initCall){
            return
        }
        setCurrentProfileCall({
            username : currentChat.username,
            profilePic : currentChat.profilePic,
            profileId : currentChat.profileId
        })
        setInitCall(true)
        setCallVisiblity(true)
    }

    return (
        <div className="p-2 pl-4 flex justify-between bg-slate-800 items-center hover:cursor-pointer">
            <div onClick={handleProfileView} className="flex items-center">
                <img className="rounded-full w-11 h-11 mr-8" src={currentChat.profilePic} alt="" />
                <div className="flex flex-col">
                    <span className="text-md text-gray-200">{currentChat.username}</span>
                    {!status? <span className="text-gray-500 text-sm">offline</span> : currentChat.typing ? <span className="text-green-500 text-sm font-semibold">typing...</span> : <span className="text-green-500 text-sm">online</span>}
                </div>
            </div>
            <div className="p-1 rounded-full mr-10">
                <svg onClick={handleInitCall} className="text-slate-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 256 256"
                >
                    <g fill="#64748B" strokeMiterlimit="10" strokeWidth="0">
                        <path
                        d="M38.789 51.211l10.876 10.876a3.122 3.122 0 003.684.543l13.034-6.997a3.12 3.12 0 013.07.066L88.47 66.984a3.113 3.113 0 011.268 3.933c-1.625 3.698-4.583 10.476-5.758 13.473-.247.631-.615 1.209-1.127 1.652-12.674 10.986-37.89-2.4-57.191-21.701C6.358 45.039-7.028 19.823 3.958 7.149c.444-.512 1.022-.88 1.652-1.127C8.606 4.847 15.385 1.889 19.083.264a3.113 3.113 0 013.933 1.268l11.285 19.017c.558.941.583 2.106.066 3.07L27.37 36.651a3.122 3.122 0 00.543 3.684l10.876 10.876zM90 49.5h-9C81 27.168 62.832 9 40.5 9V0C67.794 0 90 22.206 90 49.5z"
                        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        ></path>
                        <path
                        d="M72.5 49.5h-9c0-12.682-10.317-23-23-23v-9c17.645 0 32 14.355 32 32z"
                        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        ></path>
                    </g>
                </svg>
            </div>
        </div>
    )
}