"use client"

import { acceptCallAtom, callVisibleAtom, currentProfileCallAtom, incommingCallAtom, initCallAtom, micStatusAtom, missedCallAtom, rejectCallAtom } from "@/state"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const Calling = ({comein} : {comein : boolean})=>{

    const setCallVisiblity = useSetRecoilState(callVisibleAtom)
    const currentProfileCall = useRecoilValue(currentProfileCallAtom);
    const micStatus = useRecoilValue(micStatusAtom);
    const setInitCall = useSetRecoilState(initCallAtom)
    // const setRejectCall = useSetRecoilState(rejectCallAtom)
    const setCallEnded = useSetRecoilState(missedCallAtom)
    const setIncommingCall = useSetRecoilState(incommingCallAtom)
    const acceptCall = useRecoilValue(acceptCallAtom)

    var ringTimer : any
    function handleBack(){
        setCallVisiblity(false)
    }

    useEffect(()=>{
        ringTimer = setTimeout(()=>{
            setInitCall(false)
            setCallVisiblity(false)
        } , 10000)
     return ()=>{
        clearTimeout(ringTimer)
     }   
    }, [])

    useEffect(()=>{
      if(acceptCall){
        clearTimeout(ringTimer)
      }
    }, [acceptCall])

    return (
        <div style={{width : "34.55rem", height : "94.5%" , right : "98.66%"}} className={comein? "p-6  absolute  opacity-1 ease-in-out translate-x-full duration-300 bg-slate-900" : "p-6 absolute  opacity-0 ease-in-out duration-300 -translate-x-full bg-slate-900" }>
            {/* <div className="text-slate-300 text-3xl hover:cursor-pointer" onClick={handleBack}>&#129128;</div> */}
            <div className="w-full h-full flex flex-col pt-24 gap-6">
                <div className="text-center text-gray-500 text-2xl">
                    Calling...
                </div>
                <div className="flex justify-center">
                    <img height={90} width={90} className="rounded-full" src={currentProfileCall.profilePic} alt="" />
                </div>

                <div className="text-center text-xl">
                    {currentProfileCall.username}
                </div>

                <div className="flex justify-center gap-6 p-6 px-20">
                    <svg onClick={()=> setCallEnded(true)}
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

                    {acceptCall ? <div>call accepted</div> : <div className="hidden"></div> }
                    {/* {micStatus ? <MicOn/> : <MicOff/>} */}
                </div>
            </div>
        </div>
    )
}


