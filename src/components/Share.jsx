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

const Share = () => {

  return (
    <div className="w-full flex flex-col items-center bg-[#1E71F2] border-[1px] border-[#fff] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] sm2:rounded-[20px] md:rounded-[20px] px-[14px]">
        <div className="before:content-[''] before:bg-white before:block before:w-[40px] before:h-[3px] before:mx-auto before:rounded-[20px] before:mt-[8.98px]">
          <h5 className="text-[18.51px] font-sans text-white text-center">Share Thought</h5>
        </div>
        
        <div className="flex items-center justify-center gap-[7.95px] mt-[24px] px-[12px]">
          <div>
            <img src="/images/shareicon/share-plus.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Your Story</p>
          </div>
          <div>
            <img src="/images/shareicon/share-send-to.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Send to</p>
          </div>
          <div>
            <img src="/images/shareicon/share-user.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Anna X</p>
          </div>
          <div>
            <img src="/images/shareicon/share-user.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Anna XS</p>
          </div>
          <div>
            <img src="/images/shareicon/share-user.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Anna XV</p>
          </div>
          <div>
            <img src="/images/shareicon/share-user.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Frendy</p>
          </div>
        </div>
        <hr className="w-full color-white my-[18px]"/>
        <div className="flex items-center flex-wrap gap-y-[9px] gap-[7.95px] px-[12px]">
          <div>
            <img src="/images/shareicon/instagram.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Instagram</p>
          </div>
          <div>
            <img src="/images/shareicon/fb-messenger.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Messanger</p>
          </div>
          <div>
            <img src="/images/shareicon/facebook.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Facebook</p>
          </div>
          <div>
            <img src="/images/shareicon/whatsapp.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">WhatsAapp</p>
          </div>
          <div>
            <img src="/images/shareicon/twitter.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">X</p>
          </div>

          <div>
            <img src="/images/shareicon/reddit.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Reddit</p>
          </div>
          <div>
            <img src="/images/shareicon/pintrest.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Pintrest</p>
          </div>
          <div>
            <img src="/images/shareicon/telegram.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Telegram</p>
          </div>
          <div>
            <img src="/images/shareicon/tumblr.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Tumblr</p>
          </div>
          <div>
            <img src="/images/shareicon/linkedin.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Linkedin</p>
          </div>

          <div>
            <img src="/images/shareicon/email.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Email</p>
          </div>
          <div>
            <img src="/images/shareicon/sms.svg" />
            <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">SMS</p>
          </div>
          
        </div>
        <hr className="w-full my-[18px] color-white"/>
        <div className="flex items-center gap-[6px] mb-[14px]">
          <div className="w-[314.22px] bg-white rounded-[50px] px-[11.1px] flex items-center py-[5.33px] h-[30px]">
              <p className="text-[#1E71F2] text-[12.3px] font-sans font-[400]">https://post.colomboai.com/660ad7b3053e33a40c....</p>
          </div>
          <button className="w-[80px] text-[#1E71F2] text-[12.3px] font-sans font-[400] bg-white rounded-[50px] px-[15.69px] py-[8.33px] h-[30px]">Copy</button>
        </div>
      </div>
  )
}

export default Share