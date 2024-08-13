import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hash, hashSync } from "bcrypt";


export async function GET(req : NextRequest){

    const users = await prisma.user.findMany({});

    return NextResponse.json({
        Users : users
    })
}

function createDefaultUsername(email : string){
    const position = email.indexOf("@") 
    const username = email.slice( 0, position)
    return username;
}


export const POST = async(req : NextRequest)=>{
    const body = await req.json();
    const hashPassword = await hash(body.password, 10)
    try {
        const user = await prisma.user.create({
            data : {
                email: body.email,
                password: hashPassword
            },
            select : {
                email : true,
                password : true,
                id : true
            }
        })
        const username = await createDefaultUsername(user.email)


        const profile = await prisma.profile.create({
            data : {
                userId : user.id,
                username : username
            }
        })
        return NextResponse.json(user)
        
    } catch (error) {
        return NextResponse.json("some error occured in the db")
    }
}

export const DELETE = async(req : NextRequest)=>{
    const body = await req.json();

    try {
        const user = await prisma.user.delete({
            where : {
                id : body.userId
            }
        })
        NextResponse.json({
            deletedUser : user
        })
    } catch (error) {
        NextResponse.json({
            err : "some error occured while deleting"
        })
    }
}