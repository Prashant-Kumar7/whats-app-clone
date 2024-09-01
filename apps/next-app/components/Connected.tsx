"use client"

import { backToCallAtom, connectedAtom, currentProfileCallAtom, disconnectAtom, micStatusAtom } from "@/state"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export const Connected = ()=>{
    const [backToCall, setBackToCall] = useRecoilState(backToCallAtom)
    const currentProfileCall = useRecoilValue(currentProfileCallAtom)
    const micStatus = useRecoilValue(micStatusAtom);
    const setConnected = useSetRecoilState(connectedAtom)
    const setDisconnect = useSetRecoilState(disconnectAtom)

    function handleBack(){
        setBackToCall(false)
    }

    function handleHangUp(){
        setDisconnect(true)
    }

    return (
        <div style={{width : "34.55rem", height : "94.5%" , right : "98.66%"}} className={backToCall? "p-6  absolute  opacity-1 ease-in-out translate-x-full duration-300 bg-slate-900" : "p-6 absolute  opacity-0 ease-in-out duration-300 -translate-x-full bg-slate-900" }>
            <div className="text-slate-300 text-3xl hover:cursor-pointer" onClick={handleBack}>&#129128;</div>
            <div className="flex flex-col pt-16">
                <div className="text-2xl text-slate-600 text-center my-8">
                    Connected
                </div>
                <div className="flex justify-center">
                    <img style={{height : "15rem" , width : "15rem"}} className="rounded-full" src={currentProfileCall.profilePic} alt="" />
                </div>
                <div className="text-center text-xl my-6">
                    {currentProfileCall.username}
                </div>

                <div className="flex justify-evenly">
                    <svg onClick={handleHangUp}
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
                    {micStatus ? <MicOn/> : <MicOff/>}
                    


                </div>
            </div>
        </div>
    )
}



const MicOn = ()=>{

    const setMicStatus = useSetRecoilState(micStatusAtom)

    return (
        <svg onClick={()=>setMicStatus(false)}
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 256 256"
        >
          <path
            fill="#64748B"
            strokeMiterlimit="10"
            strokeWidth="0"
            d="M45 0C20.147 0 0 20.147 0 45s20.147 45 45 45 45-20.147 45-45S69.853 0 45 0zm-7 24.844a7 7 0 1114 0v18.792a7 7 0 11-14 0V24.844zm24.741 19.394c0 8.698-6.297 15.939-14.568 17.44v4.133h3.512a3.172 3.172 0 110 6.346H38.314a3.173 3.173 0 110-6.346h3.513v-4.133c-8.271-1.502-14.568-8.743-14.568-17.44v-3.909a3.174 3.174 0 016.346 0v3.909c0 6.283 5.112 11.395 11.395 11.395s11.395-5.112 11.395-11.395v-3.909a3.173 3.173 0 116.346 0v3.909z"
            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
          ></path>
        </svg>
    )
}


const MicOff = ()=>{

    const setMicStatus = useSetRecoilState(micStatusAtom)


    return (
        <svg onClick={()=>setMicStatus(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 256 256"
        >
          <g fill="#FFFF" strokeMiterlimit="10" strokeWidth="0">
            <path
              d="M13.453 77.08l19.69-19.69c-3.604-3.245-5.883-7.93-5.883-13.152v-3.909a3.174 3.174 0 016.346 0v3.909c0 3.471 1.564 6.578 4.02 8.67l3.465-3.465A6.992 6.992 0 0138 43.636V24.844a7 7 0 1114 0v13.688l25.079-25.08C68.916 5.152 57.562 0 45 0 20.147 0 0 20.147 0 45c0 12.562 5.152 23.916 13.453 32.08zM45 55.633c6.283 0 11.395-5.112 11.395-11.395v-1.617l-12.9 12.901a11.5 11.5 0 001.505.111z"
              transform="matrix(2.81 0 0 2.81 1.407 1.407)"
            ></path>
            <path
              d="M81.007 18.009L61.327 37.69a3.168 3.168 0 011.414 2.639v3.909c0 8.698-6.297 15.939-14.568 17.44v4.133h3.512a3.172 3.172 0 110 6.346H38.314a3.173 3.173 0 110-6.346h3.513v-4.133a17.61 17.61 0 01-3.468-1.021l-20.35 20.351A44.803 44.803 0 0045 90c24.853 0 45-20.147 45-45a44.795 44.795 0 00-8.993-26.991z"
              transform="matrix(2.81 0 0 2.81 1.407 1.407)"
            ></path>
          </g>
        </svg>
    )
}