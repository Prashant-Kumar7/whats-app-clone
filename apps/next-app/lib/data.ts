import prisma from "@/db";

export async function fetchUsers() {
    const users = await prisma.user.findMany({})

    return users
}