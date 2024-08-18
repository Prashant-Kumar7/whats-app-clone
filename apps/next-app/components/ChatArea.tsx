"use client"

import { currentChatAtom, onlineIdsAtom } from "@/state"
import { useRecoilValue } from "recoil"
import { MessageTemplate } from "./MessageTemplate"
import { useEffect, useState } from "react"

export interface ChatArea {
    name : string | undefined
}

interface ChatAreaPropsType {
    receiveMessageFn :any
    tempChats : MessageType[]
}


export interface MessageType {
    type : string
    toProfileId : string
    data : string
    fromProfileId : string
}