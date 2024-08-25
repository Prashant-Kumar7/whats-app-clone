"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export const Signin = ()=>{

    const [input, setInput] = useState({
        email : "",
        password : ""
    })


    const [err , setErr] = useState(false)

    const route = useRouter()

    const [match, setMatch] = useState(true)

    function handleChange(e: any){
        const {name , value} = e.target
        setInput((prev: any)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    async function handleSubmit(){
        const res = await signIn('credentials', {
            username: input.email,
            password: input.password,
            redirect: false,
            // callbackUrl : "/chats"
        });

         if(!res?.error){
            route.push("/chats")
         } else {
            setErr(true)
         }

    }

    return (
        <div className=" w-screen bg-slate-900 h-screen flex flex-col justify-center items-center p-6">
                    <div style={{width: "28rem"}} className="bg-slate-800 rounded-2xl pb-6">
                        <h1 className="text-4xl p-8 w-full text-left text-gray-400 font-semibold">Login</h1>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="email" placeholder="Enter email" type="email" required/>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300 my-8 mb-4" name="password" placeholder="Enter password" type="password" required/>
                        <div className={err ? "text-red-600 text-sm pl-8 my-2" : " hidden" }>Incorrect credentials!!</div>
                        <button onClick={handleSubmit} className="bg-indigo-900 p-2 text-lg rounded-xl  ml-8">Signup</button>
                        <span onClick={()=>route.push("/signup")} className="ml-8 hover:underline-offset-4 hover:underline hover:text-indigo-300 hover:cursor-pointer text-gray-400">Create account?</span>
                    </div>

                </div>
    )
}