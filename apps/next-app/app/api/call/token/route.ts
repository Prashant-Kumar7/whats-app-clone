import { NextRequest, NextResponse } from "next/server";
import { RoomServiceClient } from 'livekit-server-sdk';
import { generateReceiveOnlyToken } from "@/lib/data";


const apiKey = "API5QHQc9jNPaDU";
const apiSecret = "cZpkzYFwTIJ63fYoy5NjmEHpsWdYuJkYOsyOfSrCpF4";
const wssUrl = "wss://live-stream-j0ngkwts.livekit.cloud"


export const POST = async(req : NextRequest)=>{

    const { name, roomId } = await req.json()
    const id = `${name}_${Date.now()}`;
    const token = await generateReceiveOnlyToken(roomId , id)
    return NextResponse.json({
        token : token
    })

}







  