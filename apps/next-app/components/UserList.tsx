export interface ProfileListType {
    username : string
}


export const UserList = ({username} : ProfileListType)=>{
    return (
        <div className="p-4 bg-blue-400">
              <span className="text-xl">{username}</span>
        </div>
    )
}