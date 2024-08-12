"use client"

import { useState } from 'react'
import { DmList } from '../../components/DmList'
import { ChatArea } from '../../components/ChatArea'

const chatList = [
        {
        name : "Prashant Kumar"
        },
        {
            name : "Ankur Singh"
        },
        {
            name : "AAyush Bharti"
        },{
            name : "Rohit"
        }
]



export default function MainChats(){

const [selectedChat , setSelectedChat] = useState<ChatArea>()


  return (
    <div className='grid grid-cols-9 h-screen w-screen p-6'>
      <DmList chatList={chatList} setSelectedChat = {setSelectedChat}/>
      <ChatArea name={selectedChat?.name}/>
    </div>
  )
}
