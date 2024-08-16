import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
import { UserManager } from './managers/UserManager';

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });


const users = new UserManager()
// const clients = new Map()
wss.on('connection', function connection(ws) {

  users.addUser(ws)
  // users  .addUser(ws, wss)

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