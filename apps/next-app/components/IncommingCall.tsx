"use client"

import { acceptCallAtom, currentProfileCallAtom, incommingCallAtom, rejectCallAtom } from "@/state"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export const IncommingCall = ({comein} : {comein : boolean})=>{

    const currentProfileCall = useRecoilValue(currentProfileCallAtom);
    const [acceptCall, setAcceptCall] = useRecoilState(acceptCallAtom);
    const setRejectCall = useSetRecoilState(rejectCallAtom)
    const setIncommingCall = useSetRecoilState(incommingCallAtom)

    var ringTimer : any

    useEffect(()=>{
      ringTimer = setTimeout(()=>{
          setIncommingCall(false)
      } , 10000)
   return ()=>{
      clearTimeout(ringTimer)
   }   
  }, [])


    function handleRejectCall(){
      setRejectCall(true)
      clearTimeout(ringTimer)
    }

    function handleAcceptCall(){
      setAcceptCall(true)
      clearTimeout(ringTimer)
    }

    return (
        <div style={{width : "34.5rem", height : "94.5%" , right : "98.5%"}} className={comein? "p-6 border-r border-gray-600 absolute  opacity-1 ease-in-out translate-x-full duration-300 bg-slate-900" : "p-6 border-r border-gray-600 absolute  opacity-0 ease-in-out duration-300 -translate-x-full bg-slate-900" }>
            {/* <div className="text-slate-300 text-3xl hover:cursor-pointer" onClick={handleBack}>&#129128;</div> */}
            {/* <div>inComming call</div>
            <div>{currentProfileCall.username}</div> */}

            <div className="w-full h-full flex flex-col pt-24 gap-6">
                <div className="text-center text-gray-500 text-2xl">
                    Incomming Call
                </div>
                <div className="flex justify-center">
                    <img height={90} width={90} className="rounded-full" src={currentProfileCall.profilePic} alt="" />
                </div>

                <div className="text-center">
                    {currentProfileCall.username}
                </div>

                <div className="flex justify-evenly p-6">
                    <svg onClick={handleRejectCall}
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="70"
                        viewBox="0 0 256 256"
                        >
                        <g
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="1"
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                            >
                            <circle cx="45" cy="45" r="45" fill="#ED2121"></circle>
                            <path
                            fill="#FFF"
                            d="M57.332 70.088c-1.955.001-4.074-.313-6.32-.946-6.303-1.777-12.904-5.885-18.586-11.568-5.682-5.682-9.79-12.283-11.568-18.586-1.84-6.528-.978-11.999 2.429-15.406.124-.124.25-.244.38-.36a.983.983 0 01.112-.131l1.819-1.819a4.61 4.61 0 013.282-1.36 4.61 4.61 0 013.282 1.36l6.976 6.977a4.647 4.647 0 010 6.563L36.149 37.8a1.934 1.934 0 000 2.732L49.468 53.85c.729.729 2.002.729 2.732 0l2.988-2.988a4.649 4.649 0 016.564-.001l6.977 6.977c.876.876 1.359 2.042 1.359 3.281s-.483 2.405-1.359 3.281l-1.819 1.819a1.18 1.18 0 01-.133.114c-.117.13-.236.256-.36.379-2.235 2.236-5.359 3.376-9.085 3.376z"
                            ></path>
                        </g>
                    </svg>
                    {acceptCall ? 
                    <div>call accepted</div>
                    : <div>
                      <svg onClick={handleAcceptCall}
                        xmlns="http://www.w3.org/2000/svg"
                        width="70"
                        height="70"
                        viewBox="0 0 256 256"
                      >
                        <g fill="none" strokeMiterlimit="10" strokeWidth="0">
                          <path
                            fill="#0E9B0A"
                            d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0s45 20.187 45 45-20.187 45-45 45z"
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                          ></path>
                          <path
                            fill="#FFF"
                            d="M61.884 68.284l5.296-2.671c2.519-1.271 2.821-4.747.559-6.433l-7.994-5.959a3.796 3.796 0 00-4.137-.261l-2.322 1.312c-1.114.63-2.478.671-3.607.07-6.1-3.247-10.773-7.921-14.021-14.021-.601-1.129-.56-2.493.07-3.607l1.312-2.322a3.798 3.798 0 00-.261-4.137l-5.959-7.994c-1.686-2.262-5.163-1.96-6.433.559l-2.671 5.296c-1.248 2.475-1.317 5.392-.146 7.904 6.872 14.734 17.676 25.538 32.41 32.41 2.512 1.172 5.429 1.103 7.904-.146z"
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                          ></path>
                        </g>
                      </svg>
                    </div>}
                    

                </div>
            </div>

        </div>
    )
}