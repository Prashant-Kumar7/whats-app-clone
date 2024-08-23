import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req : NextRequest ,{ params }: { params: { username: string[] } })=>{

    

    const username = await prisma.profile.findUnique({
        where : {
            username : params.username[0]
        }
    })

    if(username){
        return NextResponse.json({
            msg : false
        })
    } else {
        return NextResponse.json({
            msg : true
        })
    }
}