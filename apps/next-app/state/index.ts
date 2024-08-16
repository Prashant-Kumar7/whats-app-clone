import { atom } from "recoil";

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


