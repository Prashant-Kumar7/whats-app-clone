import { WebSocket } from "ws";

interface MsgObjType {
    type : string
    data : string
    toProfileId : string
    fromProfileId : string
}


export class RoomManger {

    public user1 : WebSocket
    public user2 : WebSocket;
    private msgArray : any[];
    

    constructor (user1: WebSocket, user2:WebSocket){
        this.user1 = user1
        this.user2 = user2
        this.msgArray = []
        
    }

    // msg: { sender: WebSocket; message: string; }

    // sendMessages(socket: WebSocket, message : MsgObjType){
    //     console.log("inside room Manager")
    //     if(socket === this.user1){

    //         const res = {
    //             type : message.type,
    //             toProfileId : this.user2Id,
    //             data : message.data,
    //             fromProfileId : this.user1Id
    //         }

    //         this.user2.send(JSON.stringify(res))
    //         // this.msgArray.push(msgObj)

    //     } else {
    //         const res = {
    //             type : message.type,
    //             toProfileId : this.user1Id,
    //             data : message.data,
    //             fromProfileId : this.user2Id
    //         }

    //         this.user1.send(JSON.stringify(res))
    //         // this.msgArray.push(msgObj)
    //     }
    // }

    

    // initCall(socket : WebSocket , profileId : any){

        

    //     socket.send(JSON.stringify({type : "init_call" , profileId : profileId}))
    //     if(this.ringTimer){
    //         clearTimeout(this.ringTimer)
    //         this.ringTimer = null
    //     }
    //     console.log(this.ringTimer)
    //     this.ringTimer = setTimeout(()=>{
    //         this.user1.send(JSON.stringify({type : "notConnected"}))
    //         this.user2.send(JSON.stringify({type : "notConnected"}))
    //     }, 10000)

    //     // this.rejectCall()


    // }

    // callEnded(){
    //     clearTimeout(this.ringTimer)
    //     this.ringTimer = null
    //     this.user1.send(JSON.stringify({type : "notConnected"}))
    //     this.user2.send(JSON.stringify({type : "notConnected"}))
    // }


    // rejectCall(){
    //     clearTimeout(this.ringTimer)
    //     this.ringTimer = null
    //     this.user1.send(JSON.stringify({type : "notConnected"}))
    //     this.user2.send(JSON.stringify({type : "notConnected"}))
    // }

    // typingState(socket: WebSocket){
    //     if(socket === this.user1.socket){
    //         this.user2.send(JSON.stringify({type : "typing"}))
    //     } else {
    //         this.user1.socket.send(JSON.stringify({type : "typing"}))
    //     }
    // }


    // CloseConn(socket: WebSocket){
    //     if(this.user1.socket === socket){
    //         this.user2.send(JSON.stringify({msg : `${this.user1Name} left the chat`, person : "other" , type : "close_conn"}))
    //     } else if(this.user2 === socket){
    //         this.user1.socket.send(JSON.stringify({msg : `${this.user2Name} left the chat`, person : "other", type : "close_conn"}))
    //     }
    //     this.user1.socket.close()
    //     this.user2.close()
    // }

    sendOffer(socket: WebSocket , data : any){
        if(socket === this.user1){
            // send data from user1 to user2
            console.log("user1 sent an offer")
            this.user2.send(JSON.stringify(data))

        } else if(socket === this.user2){
            // send data from user2 to user1
            console.log("user2 sent an offer")
            this.user1.send(JSON.stringify(data))

        }
    }


    sendAnswer(socket: WebSocket , data : any){
        if(socket === this.user1){
            // send data from user1 to user2
            console.log("user1 sent answer")
            this.user2.send(JSON.stringify(data))
            
        } else if(socket === this.user2){
            // send data from user2 to user1
            this.user1.send(JSON.stringify(data))
            console.log("user2 sent answer")
            
        }
    }

    sendIceCandidate(socket: WebSocket , data : any){
        if(socket === this.user1){
            // send data from user1 to user2
            console.log("user1 candidates")
            // console.log(data.candidates)
            // console.log(data.candidate)

            
            this.user2.send(JSON.stringify(data))

        } else if(socket === this.user2){
            // send data from user2 to user1
            console.log("user2 candidates" )
            // console.log(data.candidate)
            this.user1.send(JSON.stringify(data))
        }
    }


    gotConnected(user1:WebSocket, user2:WebSocket){
        user1.send(JSON.stringify({type : "connected"}))
        user2.send(JSON.stringify({type : "connected"}))

    }


    gotDisconnected(){
        this.user1.send(JSON.stringify({type : "disconnected"}))
        this.user2.send(JSON.stringify({type : "disconnected"}))
    }
}