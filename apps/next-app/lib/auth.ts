import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/db/index";
import { compare, genSaltSync, hash, hashSync } from "bcrypt";




export const NEXT_AUTH_CONFIG = {
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID ?? "",
        //     clientSecret: process.env.GITHUB_SECRET ?? ""
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        // }),
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any ) {
            const hashPassword = await hash(credentials.password, 10);

            try {
              const user = await prisma.user.findUnique({
                where : {
                  email : credentials.username
                }, 
                select : {
                  id : true,
                  email : true,
                  password: true
                }
              })

              const profile = await prisma.profile.findUnique({
                where : {
                  userId : user?.id
                }
              })

  
              if (user && await compare(credentials.password, user.password)){
                return {
                  id: user.id,
                  email: user.email,
                  profileId : profile?.username,
                  password : user.password,

                };
              } else {
                console.log("error msg user doesnot exist")
                return null
              }


              

            } catch (error) {
              console.log(error)

              return null
            }
            
            
            
            
            // return null
                         
              
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      session: async ({ session, token, user }: any) => {

        try {

          const user = await prisma.user.findUnique({
            where : {
              email : session.user.email
            }
          })

          const profile = await prisma.profile.findUnique({
            where : {
              userId : user?.id
            }
          })

          
          if (session.user) {
            session.user.id = user?.id
            session.user.profileId = profile?.id
          }

        
        } catch (error) {
          return error
        }

          
          return session
      }
    },
    // pages: {
    //     signIn: '/signin',
    // }
  }