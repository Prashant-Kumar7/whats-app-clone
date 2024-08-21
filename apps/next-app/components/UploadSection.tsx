"use client";
import { updateAtom } from "@/state";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
export const UploadSection = ({setPicUrl} : any)=>{

    const [hover, setHover] = useState(false)
    const [imageUrl , setImageUrl] = useState(null);
    const setUpdateAtom = useSetRecoilState(updateAtom)



    useEffect(()=>{
        if(imageUrl){
            axios.put("http://localhost:3000/api/profile" , {profilePic : imageUrl}).then(()=>{
              setUpdateAtom(true)
            })
        }
    }, [imageUrl])


    function handleHover(){
        setHover(true)
    }


    function handleNotHover(){
        setHover(false)
    }


    function handleUpload(e: any){
        const image = new FormData()
        image.append("file", e.target.files[0])
        image.append("upload_preset", "ml_default")
        if(process.env.CLOUD_NAME){
            image.append("cloud_name", process.env.CLOUD_NAME)
        }


        setPicUrl(URL.createObjectURL(e.target.files[0]))

        axios.post("https://api.cloudinary.com/v1_1/dx60om4b0/image/upload" , image).then((res)=>{
            const imgData = res.data
            setImageUrl(imgData.url.toString())
        })
    }




    return (
        <div style={{height : "15rem" , width : "15rem"}} onMouseEnter={handleHover} onMouseLeave={handleNotHover} className={hover ? "flex items-center text-center absolute opacity-70 bg-gray-400 rounded-full flex justify-center items-center text-green-600 cursor-pointer font-normal  rounded-full justify-center" : "flex items-center text-center absolute opacity-0 bg-gray-400 rounded-full flex justify-center items-center text-green-600 cursor-pointer font-normal  rounded-full justify-center"}>
          <Label
            htmlFor="dropzone-file"
            className="flex  h-60 w-full cursor-pointer flex-col items-center justify-center rounded-full"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center">
              <p className="mb-2 text-sm text-green-600">
                <span className="">Change <br /> profile picture</span>
              </p>
            </div>
            <FileInput onChange={handleUpload} id="dropzone-file" className="hidden" />
          </Label>
        </div>
    )

}