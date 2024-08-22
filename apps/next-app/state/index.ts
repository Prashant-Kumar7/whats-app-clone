interface Chats {
    username : string
    profilePic : string
    profileId : string
    chats : any[]
    status : any
}
import axios from "axios"
import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const dmListAtom = atom({
    key : "dmListAtom",
    default : []
})


const chats : any[] = []

export const currentChatAtom = atom({
    key : "currentChatAtom",
    default : {
        username : "",
        profilePic : "",
        profileId : "",
        status : "",
        chats : chats
    }
})




export const onlineIdsAtom = atom({
    key : "onlineIdsAtom",
    default : []
})

interface resType {
    profileId : string
    chatMessages : any[]
    unseen : boolean
    count : number
}



export const chatsAtomFamily = atomFamily({
    key : "chatsAtomFamily",
    default : (id: string) =>{
        const res : resType = {
            profileId : id,
            chatMessages : [],
            unseen : false,
            count : 0
        }
        return res
    }
})

const res : any = null

export const resAtom = atom ({
    key : "resAtom",
    default : {
        response : res,
        fromProfileId : ""
    }
})


const send : any = null


export const sendAtom = atom ({
    key : "sendAtom",
    default : {
        send : send,
        fromProfileId : ""
    }
})


export const menuAtom = atom({
    key :"menuAtom",
    default : false
})


export const settingsAtom = atom({
    key : "settingsAtom",
    default : false
})


export const LoggedInUserAtom = atom ({
    key : "loggedInUserAtom",
    default : {}
})


export const updateAtom = atom ({
    key : "updateAtom",
    default : false
})


export const profileInfoAtom = atom ({
    key : "profileInfoAtom",
    default : false
})



export const viewProfilePicAtom = atom ({
    key : "viewProfilePicAtom",
    default : false
})