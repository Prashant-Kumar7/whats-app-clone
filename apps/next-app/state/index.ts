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
        typing : null,
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
    typing : boolean
}



export const chatsAtomFamily = atomFamily({
    key : "chatsAtomFamily",
    default : (id: string) =>{
        const res : resType = {
            profileId : id,
            chatMessages : [],
            unseen : false,
            count : 0,
            typing : false
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

export const callVisibleAtom = atom({
    key : "callVisibleAtom",
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

export const typingAtom = atom ({
    key : "typingAtom",
    default : {
        typing : false,
        profileId : ""
    }
})

export const initCallAtom = atom({
    key : "initCallAtom",
    default : false
})

export const currentProfileCallAtom = atom({
    key : "currentProfileCall",
    default : {
        username : "",
        profilePic : "",
        profileId : "",
    }
})

export const micStatusAtom = atom({
    key : "MicStatusAtom",
    default : true
})


export const acceptCallAtom = atom({
    key : "acceptCallAtom",
    default : false
})


export const rejectCallAtom = atom ({
    key :"rejectCallAtom",
    default : false
})

export const missedCallAtom = atom ({
    key : "missedCall Atom",
    default : false
})

export const incommingCallAtom = atom({
    key: "incommingCallAtom",
    default : false
})

export const backToCallAtom = atom ({
    key: "backToCallAtom",
    default : true
})

export const connectedAtom = atom ({
    key: "connectedAtom",
    default : false
})

export const disconnectAtom = atom({
    key : "disconnectAtom",
    default : false
})