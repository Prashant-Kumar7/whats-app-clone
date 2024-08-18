interface Chats {
    username : string
    profilePic : string
    profileId : string
    chats : any[]
    status : any
}
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
}



export const chatsAtomFamily = atomFamily({
    key : "chatsAtomFamily",
    default : (id: string) =>{
        const res : resType = {
            profileId : id,
            chatMessages : []
        }
        return res
    }
})


export const resAtom = atom ({
    key : "resAtom",
    default : {}
})

