import prisma from "@/db";

export async function fetchAllProfiles() {
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

export async function fetchDmList(profileId: string) {
    const DmList = await prisma.profile.findUnique({
        where : {
            id : profileId
        }, 
        select : {
            DmList : true
        }
    })

    return DmList;
}