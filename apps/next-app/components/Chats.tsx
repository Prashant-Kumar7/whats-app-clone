"use client"

interface Chats {
    name : string | undefined
    setChat : Function
}

export const Chats = ({name, setChat} : Chats)=>{

    function handleClick(){
        setChat((p: any)=>{
            return {
                ...p,
                name : name
            }
        })
    }

    return (
        <div onClick={handleClick} className="p-6 flex border-b gap-4 border-slate-700">
                <img className="rounded-full w-8 h-8" src="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" alt="" />
            <span>{name}</span>
        </div>
    )
}