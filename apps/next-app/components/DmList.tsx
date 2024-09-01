"use client"

import { useEffect } from "react"
import { Chats } from "./Chats";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { backToCallAtom, callVisibleAtom, connectedAtom, dmListAtom, initCallAtom, onlineIdsAtom } from "@/state";
import { Menu} from "./Menu";





export const DmList = ({chatList , id} : any )=>{
    const [DmList ,setDmList] = useRecoilState(dmListAtom);
    const onlineIds = useRecoilValue(onlineIdsAtom)
    const connected = useRecoilValue(connectedAtom)
    const setCallVisiblity = useSetRecoilState(callVisibleAtom)
    const setBackToCall = useSetRecoilState(backToCallAtom)

    useEffect(() => {
        setDmList(chatList)
    }, [])


    function handleCallVisiblity(){
        setBackToCall(true)
    }

    return (
        <div className='flex flex-col col-span-3 bg-slate-900 border-r border-gray-600 rounded-l-sm'>
            <div className="border-b border-slate-700 flex justify-between p-6">
                <span className="text-3xl">Chats</span>
                <Menu/>
            </div>
            { connected? <div style={{width : "34.5rem"}} onClick={handleCallVisiblity} className="bg-green-600 m-0 py-0 px-1 text-sm absolute">Ongoing call</div> : <div></div> }
            <div style={{height : "40.45rem"}} className="w-full overflow-y-auto">
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
                        status = {status}
                        />
                    )
                })}
            </div>
      </div>
    )
}