"use client"
import { useState } from "react"
import { FaceWithPeekingEye, CrossIcon } from "@/components/Icons"
export default function CreateVibeErrorComponent(currentState){
    const [isVisible,setIsVisible] = useState(currentState)
    const handleVisibility =() =>{
        setIsVisible(!isVisible)
    }
    return(
        <>
        {isVisible &&
         <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
         <div className="bg-white    
     rounded-[10px] p-4 h-[267px] w-[350px] border border-0.5 border-[#F7F7F7] ">
       <div className="cursor-pointer w-full h-[12px] " onClick={()=>handleVisibility()}>
       <div className="float-end">
       <CrossIcon w={12} h={12} fill={'#515151'}/>
     
     
     
     
       </div>
       </div>
       <div className="flex justify-center  w-[72px] h-[72px] flex mx-auto mb-5">
         <FaceWithPeekingEye  />
       </div>
       <div className=" w-[317px] h-[125px]  flex justify-center items-center text-center p-2">
             <div className="font-[700] text-[20px] text-[#E95050]">
       Your Vibe is epic, but it's a bit too long and heavy!  
       <span className="font-[450] text-black ">
       &nbsp; Keep it under 1 GB, shorter than 10 minutes, and in MP4, MOV, AVI, or WMV format. Let's make this Vibe rock!
     
       </span>
       </div>
       </div>
       </div>
       </div>
        }
        </>
    )

}