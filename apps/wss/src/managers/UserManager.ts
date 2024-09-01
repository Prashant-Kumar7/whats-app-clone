

import { WebSocket } from "ws";
import { RoomManger } from "./RoomManager";

export interface PendingUser {
    socket : WebSocket,
    name : string
}

const clients = new Map()


export class UserManager {
    private onlineIds : string[]
    private rooms : RoomManger[]
    constructor() {
        this.onlineIds = [];
        this.rooms = []
    }

    addUser(socket: WebSocket) {

        this.addHandler(socket)
    }
    
    private sendUserStatus (){
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

        const resData = {type : "getUsersStatus", profileId : metadata.profileId , onlineIds : this.onlineIds}
        key.send(JSON.stringify(resData))
      })
    }


    private addHandler(socket: WebSocket){
        socket.on('message' , (data)=>{
            const message = JSON.parse(data.toString())
        
            if(message.type === "init_conn"){
              const profileId = message.profileId 
              const metadata = { profileId }
              clients.set(socket , metadata)
              this.sendUserStatus();
            }
        
            if(message.type === "close_conn"){
            console.log("insdie close message")
            socket.close()
              // }
              
            }
        
            if(message.type === "Message"){
              clients.forEach((value, key)=>{
                const metadata = clients.get(key)
                if(message.toProfileId === metadata.profileId){
                  const userId = clients.get(socket)
                  const res = {
                    type : "Message",
                    toProfileId : message.toProfileId,
                    data : message.data,
                    fromProfileId : userId.profileId
                  }

                  key.send(JSON.stringify(res))
                }
              })
            }


            if(message.type === "Update"){
              clients.forEach((value , key)=>{
                const res = {
                  type : "updateOccured"
                }

                key.send(JSON.stringify(res))
              })
            }


            if(message.type === "Typing"){
              const myMetaData = clients.get(socket);
              clients.forEach((value, key)=>{
                const metadata = clients.get(key)
                if(metadata.profileId === message.profileId){
                  const res = {
                    type : "typing",
                    profileId : myMetaData.profileId
                  }
                  key.send(JSON.stringify(res))
                }
              })
            }
        
            if(message.type === "init_call"){
              const myMetaData = clients.get(socket);
              clients.forEach((value, key)=>{
                const metadata = clients.get(key);
                if(metadata.profileId === message.profileId){
                  // const room = new RoomManger(key, socket);
                  // this.rooms.push(room)
                  // room.initCall(key , myMetaData.profileId)
                  key.send(JSON.stringify({type : "init_call" , profileId : myMetaData.profileId}))
                }
              })

              

            }

            const room = this.rooms.find(room=> room.user1 === socket || room.user2 === socket);


            if(message.type === "callEnded"){
              clients.forEach((value, key)=>{
                const metadata = clients.get(key);
                if(metadata.profileId === message.profileId){
                  key.send(JSON.stringify({type : "notConnected"}))
                  socket.send(JSON.stringify({type : "notConnected"}))
                }
              })
            }

            if(message.type === "callRejected"){
              clients.forEach((value, key)=>{
                const metadata = clients.get(key);
                if(metadata.profileId === message.profileId){
                  key.send(JSON.stringify({type : "notConnected"}))
                  socket.send(JSON.stringify({type : "notConnected"}))
                }
              })
              // if(room){
              //   room.rejectCall()
              // }
            }


            if(message.type === "callAccpeted"){


              clients.forEach((value, key)=>{
                const metadata = clients.get(key);
                if(metadata.profileId === message.profileId){
                  key.send(JSON.stringify({type : "connected"}))
                  socket.send(JSON.stringify({type : "connected"}))
                }
              })
            }

            if(message.type === "disconnected"){
              clients.forEach((value, key)=>{
                const metadata = clients.get(key);
                if(metadata.profileId === message.profileId){
                  key.send(JSON.stringify({type : "disconnected"}))
                  socket.send(JSON.stringify({type : "disconnected"}))
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
            this.sendUserStatus()
          })


    }
}