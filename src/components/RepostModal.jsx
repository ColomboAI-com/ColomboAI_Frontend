'use client'
import AgreeTermAndConditions from "@/components/auth/AgreeTermAndConditions"
import RedirectLink from "@/components/auth/RedirectLink"
import SocialAuthentication from "@/components/auth/SocialAuthentication"
import { EmailValidation, NameValidation, PhoneValidation, UsernameValidation } from "@/components/Validations"
import { auth } from "@/context/AuthContext"
import Button from "@/elements/Button"
import { setSessionStorage } from "@/utlils/utils"
import { isValidEmail, isValidName, isValidPhone, isValidUserName } from "@/utlils/validate"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const RepostModal = () => {

  return (
    <div className="w-full flex flex-col items-center bg-white border-[#E3E3E3] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] sm2:rounded-[20px] md:rounded-[20px] px-[14px] pt-[40px] pb-[29px]">
        <div className="">
            <div className="w-[110px] mx-auto rounded-[50%]">
                <img src="/images/repost/repost-img.png" className="rounded-[50%]"/>
            </div>
            <div className="mt-[29px]">
                <p className="font-sans text-[#515151] text-[22.29px] font-[450] leading-[25.57px] text-center">Are you sure you want to repost <br />
                <span className="font-[700]">@aabc.aa.ss</span>’s thought ?</p>
            </div>
            <div>
        <Button title={'REPOST'} className={'mt-[24px] text-[16.72px] block w-full rounded-[40px] font-sans font-[450] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'} />
        <Button title={'CANCEL'} className={'mt-[17px] text-[16.72px] block w-full bg-[#E3E3E3] rounded-[40px] font-sans font-[450] px-[20px] py-[12px] text-[#333333] focus:bg-[#E3E3E3] transition duration-300 ease-in'} />
            </div>
        </div>
    </div>
  )
}

export default RepostModal