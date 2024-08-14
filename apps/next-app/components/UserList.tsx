"use client"

import axios from "axios"

export interface ProfileListType {
    profileId : string
    username : string
}


export const UserList = ({username, profileId} : ProfileListType)=>{


    //this handler needs to be tested
    function handleClick(){
        axios.post("/api/DmList" , {profileId : profileId}).then(()=>{
            alert(`${username} added to DM`)
        })

    }

    return (
        <div className="p-4 bg-slate-800 flex justify-between">
              <span className="text-xl">{username}</span>
              <button onClick={handleClick} className="p-2 rounded-md bg-indigo-900">Add to DM</button>
        </div>
    )
}