"use client"

interface Chats {
    name : string | undefined
    setChat : Function
}

export const Chats = ({name, setChat} : Chats)=>{
    return (
        <div onClick={()=>{setChat((p: any)=>{
            return {
                ...p,
                name : name
            }
        })}} className="p-6 border-b border-slate-700">
            <span>{name}</span>
        </div>
    )
}