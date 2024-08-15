// import { Socket } from "socket.io";
// import { RoomManager } from "./RoomManager";

import { WebSocket } from "ws";
import { RoomManger } from "./RoomManager";

export interface PendingUser {
    socket : WebSocket,
    name : string
}

const clients = new Map()


export class UserManager {
    private rooms : RoomManger[]
    private users: WebSocket[]; 
    private pendingUser: PendingUser | null;
    // private roomManager: RoomManager;
    
    constructor() {
        this.users = [];
        this.rooms = [];
        this.pendingUser = null
        // this.roomManager = new RoomManager();
    }

    addUser(socket: WebSocket , wss : any) {
        this.users.push(socket)
        const id = this.uuidv4();
        const users = wss.clients
        const metadata = {users}
        clients.set(wss , metadata)

        this.addHandler(socket)
        // this.addHandler(socket)
    }


    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket)
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    private addHandler(socket: WebSocket){
        socket.on('message', (data)=>{
            
            const message = JSON.parse(data.toString())
            
            //when user wants to let know the wss that they are online

            if (message.type === "init_conn"){
                console.log(message.master)
                console.log(message.slave.map((id : any)=>{
                    return id
                }))
            }


            const room = this.rooms.find(room=> room.user1.socket === socket || room.user2 === socket);
            
            //when any user wants to send msg to another user  
            if (message.type === "Message"){
                if(room){
                    room.sendMessages(socket, message.msg)
                }
                
            }


            if (message.type === "Typing"){
                //when user1 is typing, user2 gets to know that user1 is typing and vice-versa
                if(room){
                    room.typingState(socket)
                }
            }

            if (message.type === "Close"){
                // when user1 have asked to be connected to user2 and before user2 is avaiable the user decides to leave the connection
                if(this.pendingUser?.socket === socket){
                    this.pendingUser = null
                }


                if(room){
                    room.CloseConn(socket)
                    this.rooms = this.rooms.filter((emptyRoom)=>{
                        return room != emptyRoom
                    })
                }
            }
        })
    }
}