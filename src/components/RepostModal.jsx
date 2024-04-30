'use client'
import Button from "@/elements/Button"
import ProfilePicture from "./elements/ProfilePicture"
import { useContext } from "react"
import { FeedContext } from "@/context/FeedContext"

const RepostModal = ({ post, onRepost, setIsRepostOpen }) => {

  const { loadings } = useContext(FeedContext)

  return (
    <div className="w-full flex flex-col items-center bg-white border-[#E3E3E3] sm2:w-[430px] md:w-[430px] z-50 rounded-t-[20px] sm2:rounded-[20px] md:rounded-[20px] px-[14px] pt-[40px] pb-[29px]">
      <div className="">
        <div className="w-[110px] mx-auto rounded-[50%]">
          <ProfilePicture size={110} image={post?.creator?.profile_picture} />
        </div>
        <div className="mt-[29px]">
          <p className="font-sans text-[#515151] text-[22.29px] font-[450] leading-[25.57px] text-center">Are you sure you want to repost <br />
            <span className="font-[700]">@{post?.creator?.user_name}</span>’s post ?</p>
        </div>
        <div>
          <Button
            title={'REPOST'}
            className={'mt-[24px] text-[16.72px] block w-full rounded-[40px] font-sans font-[450] bg-brandprimary px-[20px] py-[12px] text-white focus:bg-brandprimary transition duration-300 ease-in'}
            loading={loadings.rePost}
            onClick={onRepost}
          />
          <Button
            title={'CANCEL'}
            className={'mt-[17px] text-[16.72px] block w-full bg-[#E3E3E3] rounded-[40px] font-sans font-[450] px-[20px] py-[12px] text-[#333333] focus:bg-[#E3E3E3] transition duration-300 ease-in'}
            onClick={() => setIsRepostOpen(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default RepostModal