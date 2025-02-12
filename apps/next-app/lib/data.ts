import prisma from "@/db";
import { RoomServiceClient } from "livekit-server-sdk";
const apiKey = "API5QHQc9jNPaDU";
const apiSecret = "cZpkzYFwTIJ63fYoy5NjmEHpsWdYuJkYOsyOfSrCpF4";
const wssUrl = "wss://live-stream-j0ngkwts.livekit.cloud"

export async function fetchAllProfiles() {
    const users = await prisma.profile.findMany({})

    return users
}

export async function fetchLoggedinProfile(profileId :string) {
    const profile = await prisma.profile.findMany({
        where : {
            id : profileId
        }
    })

    return profile[0]
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


export async function generateReceiveOnlyToken(roomName: string, participantIdentity: string) {
    //   const { userId , roomId } = await req.body

    const { AccessToken } = await import('livekit-server-sdk');
    const token = new AccessToken(process.env.LIVEKET_API_KEY || apiKey , process.env.LIVEKET_SECRET_KEY || apiSecret, {
        identity: participantIdentity, // Unique identifier for the user
    });

    token.addGrant({
        roomJoin: true,
        room: roomName,
        canSubscribe: true,
        canPublish: true,
        canPublishData: true, // Allow data message publishing if canPublish is true
      });

    const result = await token.toJwt()
    // res.json({token : result , userType : "participant"})
    return result
}

export async function generateHostToken(roomName: string, participantIdentity: string) {
    //   const { userId , roomId } = await req.body

    const { AccessToken } = await import('livekit-server-sdk');
    const token = new AccessToken(process.env.LIVEKET_API_KEY || apiKey , process.env.LIVEKET_SECRET_KEY || apiSecret, {
        identity: participantIdentity, // Unique identifier for the user
    });

    token.addGrant({
        roomJoin: true,
        room: roomName,
        canSubscribe: true,
        canPublish: true,
        canPublishData: true, // Allow data message publishing if canPublish is true
      });

    const result = await token.toJwt()
    // res.json({token : result , userType : "participant"})
    return result
}


export function generateId(): string {
    const generateSegment = () => {
        return Array.from({ length: 3 }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
        ).join('');
    };
  
    return `${generateSegment()}-${generateSegment()}-${generateSegment()}`;
}

export async function createBroadcastRoom(roomId : string) {
    const roomService = new RoomServiceClient(wssUrl, apiKey, apiSecret);
  
    try {
      const room = await roomService.createRoom({
        name: roomId,
        emptyTimeout: 0, // Prevent room from auto-closing
        maxParticipants: 100, // Adjust as needed
      });
  
      console.log(`Room created: ${room.name}`);
      return room.name;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
}