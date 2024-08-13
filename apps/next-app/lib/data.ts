import prisma from "@/db";

export async function fetchUsers() {
    const users = await prisma.profile.findMany({})

    return users
}

export async function fetchLoggedinProfile(userId :string) {
    const profile = await prisma.profile.findUnique({
        where : {
            userId : userId
        }
    })

    return profile
}

export async function fetchDmList(username:string , profileId: string) {
    const DmList = await prisma.dmList.findMany({
        where : {
            userName : username,
            profileId : profileId
        }
    })

    return DmList;
}