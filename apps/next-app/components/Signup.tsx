"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const Signup = ()=>{

    const [input, setInput] = useState({
        email : "",
        password : "",
        confirmPwd : ""
    })

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

    function handleSubmit(){
        if(input.password !== input.confirmPwd){
            setMatch(false)
            return
        }
        axios.post("http://localhost:3000/api/user" , input).then(()=>{
            alert("signup successful. Redirecting to Login page")
            route.push("http://localhost:3000/api/auth/signin?callbackUrl=%2Fchats")
        })
    }

    return (
        <div className="border-l border-gray-700 col-span-3 flex flex-col justify-center items-center p-6">
                    <div style={{height : "27rem" , width: "28rem"}} className="bg-slate-800 rounded-lg">
                        <h1 className="text-4xl p-8 w-full text-left text-gray-400 font-semibold">Create Account!</h1>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="email" placeholder="Enter email" type="email" required/>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300 my-8" name="password" placeholder="Enter password" type="password" required/>
                        <input onChange={handleChange} className="bg-transparent ml-8 w-96 rounded-lg focus:ring-indigo-900 text-lg text-gray-300" name="confirmPwd" placeholder="Confirm password" type="password" required/>
                        {match ? <div></div> : <div className="text-red-600 text-sm">password doesnot match!!</div> }
                        <button onClick={handleSubmit} className="bg-indigo-900 p-2 text-lg rounded-xl my-6 ml-8">Signup</button>
                        <span onClick={()=>route.push("/signin")} className="ml-8 hover:underline-offset-4 hover:underline hover:text-indigo-300 hover:cursor-pointer text-gray-400">Already have an account?</span>
                    </div>

                </div>
    )
}