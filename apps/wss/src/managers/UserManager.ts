

import { WebSocket } from "ws";
import { RoomManger } from "./RoomManager";

export interface PendingUser {
    socket : WebSocket,
    name : string
}

const clients = new Map()


export class UserManager {
    private onlineIds : string[]
    
    constructor() {
        this.onlineIds = [];
    }

    addUser(socket: WebSocket) {

        this.addHandler(socket)
    }


    

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    private addHandler(socket: WebSocket){
        socket.on('message' , (data)=>{
            const message = JSON.parse(data.toString())
        
            if(message.type === "init_conn"){
              const profileId = message.profileId 
              const metadata = { profileId }
              clients.set(socket , metadata)
        
            }
        
            if(message.type === "getUsersStatus"){
              clients.forEach((value , key)=>{
                const metadata = clients.get(key)
                var existingId = this.onlineIds.find((x)=>{
                    if(x === metadata.profileId){
                        return true
                    } else {
                        return false
                    }
                })
                if(!existingId){
                    this.onlineIds.push(metadata.profileId)
                }
              })
              const metadata = clients.get(socket)
              const resData = {type : "getUsersStatus", profileId : metadata.profileId , onlineIds : this.onlineIds}
              socket.send(JSON.stringify(resData))
            }
        
            if(message.type === "close_conn"){
            console.log("insdie close message")
            socket.close()
              // }
              
            }
        
            if(message.type === "Message"){
              clients.forEach((value, key)=>{
                const metadata = clients.get(key)
                if(message.receiverId === metadata.profileId){
                  key.send(message.msg)
                }
              })
            }
        
        
          })

          socket.on('close' , (number , reason)=>{
            const metadata = clients.get(socket)

            this.onlineIds = this.onlineIds.filter((id)=>{
              return id != metadata.profileId
            })
            clients.delete(socket)
          })
    }
}