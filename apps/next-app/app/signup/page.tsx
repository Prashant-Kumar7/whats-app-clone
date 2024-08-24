import { Signup } from "@/components/Signup";

export default function (){
    return (
        <div className="h-screen w-screen p-6">
            <div className=" grid grid-cols-9 bg-slate-900 w-full h-full">
                <div className="col-span-6 flex flex-col items-center p-40">
                    <h1 className="p-10 text-left w-full text-green-600 font-bold text-5xl">LinkUp</h1>
                    <p className="text-gray-400 text-xl pl-10">Connect instantly with people from around the world. <br />
                        Voice and video calls: Have face-to-face conversations with your friends and family.
                    </p>
                    <span></span>
                </div>
                <Signup/>
            </div>
        </div>
    )
}