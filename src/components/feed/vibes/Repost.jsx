"use client"
import ProfilePicture from "@/components/elements/ProfilePicture"
import { useState } from "react"
export default function RepostVibe(currentState){
    const [isVisible,setIsVisible] = useState(currentState)
    const handleVisibility =() =>{
        setIsVisible(!isVisible)
    }
    return(
        <>
        {isVisible &&
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
          <div className="bg-white    
 rounded-[20px] p-4 h-[360px] w-[439.88px] ">
    <div className="w-[110px] mx-auto rounded-[50%] mt-[36.25px]">
          <ProfilePicture size={110} image={'https://s3-alpha-sig.figma.com/img/2f42/781a/46fc13711665cc1204dd5bbff5572a61?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Vg7X0NIq9-KK89jxIdwv08Yg0EzDxzgilrPE91mdMujhWtpMYeZF62EWwK4VDiLRE~p~WAWdtT96caHs4Syd0bWkr0oe8vpD9HlZeUrBKTPVXR~1Cap7YL5XF~~wTNgtArtiO9GRcQpOak93M406aKsdn8HLiun-KjD2r7fOyfrFfNEYRznrHUDgGkpjvX9LQyrd5e-ksFMx5sTfRZzUMIhpMS-fB17tlLNhmzTDM994Nnwe0tC3rlKz1OmUVnC~uaH5jIi~UDYuGi8ABFpu7lwnV3CDeMO~xTa3D~gw~QQmXb6oNB3tfP3n11U4DKDqgAM7HZM6J54Drz8wVhQsYA__'} />
        </div>
            <div className="text-[#515151] text-[18px] font-[450] my-[14.62px]  justify-center">
                <div className="flex justify-center">
                Are you sure you want to repost
                </div>
                <div className="flex justify-center">
                    <span className="font-[700]">
                 @abc.abc's  
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