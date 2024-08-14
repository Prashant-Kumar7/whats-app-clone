import prisma from "@/db";
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export const GET = async()=>{

    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const DmList = await prisma.profile.findUnique({
        where : {
            id : session.user.profileId
        },
        select : {
            DmList : true
        }
    })

    return NextResponse.json(DmList)
}



export const POST = async(req: NextRequest)=>{

    const body = await req.json()
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user = await prisma.profile.findUnique({
        where : {
            id : session.user.profileId
        }
    })

    if(!user){
        return NextResponse.json({
            err : "profile doesn't exist"
        })
    }


    const updateDmList = await prisma.profile.update({
        data : {
            DmList : [...user.DmList, body.profileId]
        },
        where : {
            id : session.user.profileId
        }
    })

    

    return NextResponse.json({
        msg : "success"
    })
}


// export const DELETE = async(req: NextRequest)=>{
//     const session = await getServerSession(NEXT_AUTH_CONFIG);
//     const body = await req.json()

//     // const dm = await prisma.dmList.findMany({
//     //     where : {
//     //         userName : body.username,
//     //         profileId : session.user.profileId
//     //     }
//     // })

//     await prisma.dmList.deleteMany({
//         where : {
//             userName : body.username,
//             profileId : session.user.profileId
//         },
//     })

//     return NextResponse.json({
//         delete_DM : "success"
//     })
// }