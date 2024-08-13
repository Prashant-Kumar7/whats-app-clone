import prisma from "@/db";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { fetchLoggedinProfile } from "@/lib/data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


//working
export const GET = async(req: NextRequest)=>{
    const session = await getServerSession(NEXT_AUTH_CONFIG)
    const profileData = await fetchLoggedinProfile(session.user.id)


    return NextResponse.json({
        profile : profileData
    })
}

//need to be tested 
export const PUT  = async(req: NextRequest)=>{
    const session = await getServerSession(NEXT_AUTH_CONFIG)
    const body = await req.json();
    const profileData = await fetchLoggedinProfile(session.user.id)

    const updateProfile = await prisma.profile.update({
        data : {
            username : body.username || profileData?.username,
            profilePic : body.profilePic || profileData?.profilePic
        },
        where : {
            userId : session.user.id
        }
    })
    return NextResponse.json({
        updatedProfile : updateProfile
    })
}