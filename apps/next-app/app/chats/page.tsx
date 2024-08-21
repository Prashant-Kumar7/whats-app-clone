

import { useState } from 'react'
import { DmList } from '../../components/DmList'
import { ChatArea } from '../../components/ChatArea'
import { fetchAllProfiles, fetchDmList, fetchLoggedinProfile } from '@/lib/data'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH_CONFIG } from '@/lib/auth'
import { ChatPage } from '@/components/ChatPage'
import prisma from '@/db'

export interface SingleProfileType {
    id: string;
    name: string | null;
    username: string;
    userId: string;
    profilePic: string;
    DmList: string[];

}

export default async function MainChats(){

  const session =  await getServerSession(NEXT_AUTH_CONFIG)
  const allProfiles = await fetchAllProfiles()
  const chatList = await fetchDmList(session.user.profileId)
  
  const tempArray = chatList?.DmList.map((id)=>{
    return allProfiles.find((userProfile : SingleProfileType)=>{
      if(session.user.id == userProfile.userId){
        console.log("profile Found")
      }
      return id === userProfile.id 
    })
  })



  const userData = allProfiles.find((userProfile : SingleProfileType)=>{
    return session.user.profileId === userProfile.id
  })



  return (
    <ChatPage currentChat={userData} chatList={tempArray} loggedInUserSession = {session}/>
  )
}
