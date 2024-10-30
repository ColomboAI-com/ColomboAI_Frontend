"use client"
import ProfilePicture from "@/components/elements/ProfilePicture"
import { useState } from "react"
export default function RepostVibe({currentState, vibe}){
    const [isVisible,setIsVisible] = useState(currentState)
    const handleVisibility =() =>{
        setIsVisible(!isVisible)
    }

    console.log(vibe);

    return(
        <>
        {isVisible &&
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
          <div className="bg-white    
 rounded-[20px] p-4 h-[360px] w-[439.88px] ">
    <div className="w-[110px] mx-auto rounded-[50%] mt-[36.25px]">
          <ProfilePicture size={110} image={vibe.creator.profile_picture} />
        </div>
            <div className="text-[#515151] text-[18px] font-[450] my-[14.62px]  justify-center">
                <div className="flex justify-center">
                Are you sure you want to repost
                </div>
                <div className="flex justify-center">
                    <span className="font-[700]">
                 {vibe.creator.user_name}'s  
                 </span>
                
                  &nbsp; vibe?
                 </div>
            </div >
            <div className="flex justify-center my-[14.62px]">
              <button className="bg-[#1E71F2] rounded-[100px] text-[16px] font-[500] text-white px-4 py-2  h-[40.5px] w-[270px]" >

                REPOST
              </button>
              </div>
            <div className="flex justify-center">
                
              <button onClick={()=>handleVisibility()} className="bg-[#D1D1D1] text-[16px] rounded-[100px] text-[#333333] font-[500] px-4 py-2 mr-2 h-[40.5px] w-[270px]">
                CANCEL
              </button>
              </div>
              
          </div>
        </div>
        }
        </>
    )

}