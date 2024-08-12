export interface ChatArea {
    name : string | undefined
}

export const ChatArea = ({name} : ChatArea)=>{
    return (
        <div style={{height: "100%" , width: "100%"}} className='grid grid-rows-12 col-span-6 bg-slate-900 rounded-r-sm'>
            {/* {chat header} */}
            <div className="p-4 row-span-1">
                <div>
                    <span>{name}</span>
                </div>
            </div>
            {/* {message area} */}
            <div  className="row-span-10 bg-green-400">

            </div>

            {/* {input field} */}
            <div className="row-span-1 flex p-2 gap-2">
                <input className="p-2 bg-slate-800 rounded-lg" style={{width : "93%" , height : "100%"}} placeholder="Text message" type="text" />
                <button className="bg-slate-800">send</button>
            </div>
      </div>
    )
}