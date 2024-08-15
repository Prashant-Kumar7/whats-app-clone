import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
import { UserManager } from './managers/UserManager';

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });


const users = new UserManager()
const clients = new Map()
wss.on('connection', function connection(ws) {

  ws.on('message' , (data)=>{
    const message = JSON.parse(data.toString())

    if(message.type === "init_conn"){
      // const id = uuidv4();
      const profileId = message.profileId 
      const metadata = { profileId }
      clients.set(ws , metadata)

      ws.send("connected")
    }

    if(message.type === "getUsersStatus"){
      var onlineId : string[] = []
      clients.forEach((value , key)=>{
        const metadata = clients.get(key)
        onlineId.push(metadata.profileId)
      })
      ws.send(JSON.stringify(onlineId))
    }

    if(message.type === "close_conn"){
      clients.delete(ws)
      ws.close()
    }

    if(message.type === "Message"){
      // users.sendMessage(pro)
      clients.forEach((value, key)=>{
        const metadata = clients.get(key)
        if(message.receiverId === metadata.profileId){
          key.send(message.msg)
        }
      })
    }


  })
  // users.addUser(ws, wss)

  // ws.send(`Hello! Message From Server!!`);
});



// wss.on('close' , function close(ws: WebSocket){

// })


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}