'use client'
import { copyValue } from "@/utlils/commonFunctions"
import Link from "next/link";
import { useState } from "react"

const Share = ({ specificPostId }) => {

  const postURL = `${window.location.href}/${specificPostId}`;

  const handleCopy = () => {
    copyValue(postURL)
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#1E71F2] border-[1px] border-[#fff] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] sm2:rounded-[20px] md:rounded-[20px] px-[14px]">
      <div className="before:content-[''] before:bg-white before:block before:w-[40px] before:h-[3px] before:mx-auto before:rounded-[20px] before:mt-[8.98px]">
        <h5 className="text-[18.51px] font-sans text-white text-center">Share Post</h5>
      </div>

      {/* <div className="flex items-center justify-center gap-[7.95px] mt-[24px] px-[12px]">
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
        </div> */}
      <hr className="w-full color-white my-[18px]" />
      <div className="flex items-center flex-wrap gap-y-[9px] gap-[7.95px] px-[12px]">
        <Link href={`https://www.instagram.com/?url=${encodeURIComponent(postURL)}`} target="_blank">
          <img src="/images/shareicon/instagram.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Instagram</p>
        </Link>
        <Link href={"https://www.messenger.com/"} target="_blank">
          <img src="/images/shareicon/fb-messenger.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Messanger</p>
        </Link>
        <Link href={`https://www.facebook.com/sharer.php?u=${postURL}`} target="_blank">
          <img alt="" src="/images/shareicon/facebook.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Facebook</p>
        </Link>
        <Link href={`https://api.whatsapp.com/send?phone=&text=${postURL}`} target="_blank">
          <img src="/images/shareicon/whatsapp.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">WhatsAapp</p>
        </Link>
        <Link href={`https://twitter.com/share?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/twitter.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">X</p>
        </Link>
        <Link href={`https://reddit.com/submit?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/reddit.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Reddit</p>
        </Link>
        <Link href={`https://pinterest.com/pin/create/bookmarklet/?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/pintrest.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Pintrest</p>
        </Link>
        <Link href={`https://telegram.me/share/url?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/telegram.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Telegram</p>
        </Link>
        <Link href={`https://www.tumblr.com/share/link?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/tumblr.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Tumblr</p>
        </Link>
        <Link href={`https://www.linkedin.com/shareArticle?url=${postURL}`} target="_blank">
          <img src="/images/shareicon/linkedin.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Linkedin</p>
        </Link>
        <Link href={`mailto:?body=Check out this site ${postURL}`} target="_blank">
          <img src="/images/shareicon/email.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">Email</p>
        </Link>
        <Link href={"#"} target="_blank">
          <img src="/images/shareicon/sms.svg" />
          <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">SMS</p>
        </Link>
      </div>
      <hr className="w-full my-[18px] color-white" />
      <div className="flex items-center gap-[6px] mb-[14px]">
        <div className="w-[314.22px] bg-white rounded-[50px] px-[11.1px] flex items-center py-[5.33px] h-[30px]">
          <input
            className="text-[#1E71F2] w-[314.22px] text-[12.3px] font-sans font-[400] focus:outline-none"
            type="text"
            placeholder="link"
            value={postURL}
            id="myShareLink"
          />
        </div>
        <button className="w-[80px] text-[#1E71F2] text-[12.3px] font-sans font-[400] bg-white rounded-[50px] px-[15.69px] py-[5.33px] h-[30px]" onClick={handleCopy}>Copy</button>
      </div>
    </div>
  )
}

export default Share