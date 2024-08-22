"use client"

import { useEffect } from "react"
import { Chats } from "./Chats";
import { SingleProfileType } from "@/app/chats/page";
import { useRecoilState, useRecoilValue } from "recoil";
import { dmListAtom, onlineIdsAtom } from "@/state";
import { Menu} from "./Menu";





export const DmList = ({chatList , id} : any )=>{
    const [DmList ,setDmList] = useRecoilState(dmListAtom);
    const onlineIds = useRecoilValue(onlineIdsAtom)


    useEffect(() => {
        setDmList(chatList)
    }, [])



    return (
        <div className='flex flex-col col-span-3 bg-slate-900 border-r border-gray-600 rounded-l-sm'>
            <div className="border-b border-slate-700 flex justify-between p-6">
                <span className="text-3xl">Chats</span>
                <Menu/>
            </div>
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