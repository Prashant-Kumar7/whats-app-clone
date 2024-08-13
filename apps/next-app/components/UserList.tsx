"use client"

import axios from "axios"

export interface ProfileListType {
    username : string
}


export const UserList = ({username} : ProfileListType)=>{


    //this handler needs to be tested
    function handleClick(){
        // axios.post("/api/DmList" , {username : username})

    }

    return (
        <div className="p-4 bg-slate-800 flex justify-between">
              <span className="text-xl">{username}</span>
              <button onClick={handleClick} className="p-2 rounded-md bg-indigo-900">Add to DM</button>
        </div>
    )
}