
import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const dmListAtom = atom({
    key : "dmListAtom",
    default : []
})

export const currentChatAtom = atom({
    key : "currentChatAtom",
    default : {
        username : "",
        profilePic : "",
        chats : [],
        profileId : "",
        status : ""
    }
})

export const onlineIdsAtom = atom({
    key : "onlineIdsAtom",
    default : []
})

interface resType {
    profileId : string
    chats : any[]
}



export const chatsAtomFamily = atomFamily({
    key : "chatsAtomFamily",
    default : (id: string) =>{
        const res : resType = {
            profileId : id,
            chats : []
        }
        return res
    }
})

