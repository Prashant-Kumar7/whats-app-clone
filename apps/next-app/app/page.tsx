import { Appbar } from "@/components/Appbar"
import { UserList } from "@/components/UserList"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { fetchUsers } from "@/lib/data"
import { getServerSession } from "next-auth"

export interface UserType {
    id: string;
    email: string;
    password: string;
    createdOn: Date;
}

export default async function ProfileList(){


  const session = await getServerSession(NEXT_AUTH_CONFIG)
  
  const users =  await fetchUsers();

  return (
      <div style={{height: "100vh"}} className=" w-screen flex flex-col gap-4 p-6">
        <Appbar/>
          <div className="p-6 bg-red-400">
              <span className="text-3xl">Profile List</span>
          </div>
          {users.map((user : UserType , index)=>{
            return(
              <UserList
              key={index}
              username={user.email}
              />
            )
          })}
          {JSON.stringify(session)}
      </div>
  )
}