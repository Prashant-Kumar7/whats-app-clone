import { createBroadcastRoom, generateId } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(req : NextRequest)=>{

    // const { name } = await req.json()
    const roomId = generateId()
    await createBroadcastRoom(roomId)
    // const id = `${name}_${Date.now()}`;
    // const token = await generateHostToken(roomId , id)
    console.log(roomId)
    return NextResponse.json({
        roomId : roomId
    })

}