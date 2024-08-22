
interface MessageType {
    toProfileId : string
    data : string
    fromProfileId : string
    loggedInProfileId : string
}

export const MessageTemplate = ({data , loggedInProfileId , fromProfileId} : MessageType)=>{
    return (
        <div className={ loggedInProfileId===fromProfileId ? "flex justify-end" : "flex justify-start"}>
            <span className="bg-slate-700 px-2 py-2 rounded-lg max-w-xl">{data}</span>
        </div>
    )
}