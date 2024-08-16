import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
import { UserManager } from './managers/UserManager';

const app = express()
const httpServer = app.listen(8080)

const wss = new WebSocketServer({ server: httpServer });

const users = new UserManager()


wss.on('connection', function connection(ws) {

  users.addUser(ws)

});
