/* eslint-disable @next/next/no-img-element */
import { CopyLinkIcon, CrossIcon, VibesShareIcon } from "@/components/Icons";
import { UserProfileContext } from "@/context/UserProfileContext";
import Link from "next/link";
import { useContext } from "react";

const ShareProfileModal = ({ userData }) => {
  const { isFollowerModalOpen, setIsFollowerModalOpen, isFollowingModalOpen,setIsFollowingModalOpen, isShareProfileModalOpen, setIsShareProfileModalOpen,} = useContext(UserProfileContext);

  const copyUrl=`${window.location}/${userData?.user_name}`;


  return (
    <div className="w-full flex flex-col bg-[#1E71F2]">
      <div className="m-6 self-end">
        <button
          className="outline-none focus:ring-offset-0 focus:ring-0"
          onClick={() => setIsShareProfileModalOpen(false)}
        >
          <CrossIcon w={20} h={20} fill={"#fff"} />
        </button>
      </div>
      <div className=" flex flex-col items-center px-12 pb-10 gap-6">
        <div className="bg-white rounded-2xl flex flex-col justify-center items-center p-3">
          <img src={`/images/profile/QR_code.png`} className=" h-full w-full p-object-cover" alt="QR_code"/>
          <p className=" text-[#515151] text-2xl font-semibold"> @{userData?.user_name}</p>
        </div>
        <div className="w-full bg-white rounded-[50px] px-[11.1px] flex items-center py-[5.33px] h-[30px] ">{copyUrl}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(copyUrl);
          }}
          className="flex w-full justify-center items-center bg-white py-4 gap-4 rounded-2xl ">
          <CopyLinkIcon w={60} h={60} fill={"#1E71F2"} />
          <p className=" text-[#515151] text-2xl">Copy Link</p>
        </button>
          <Link
          className="w-full"
           href={copyUrl} target="_blank" 
          >
            <button className="flex w-full justify-center items-center bg-white py-4 gap-4 rounded-2xl ">
              <VibesShareIcon w={60} h={60} fill={"#1E71F2"} />
              <p className=" text-[#515151] text-2xl">Share Profile</p>
            </button>
        </Link>
      </div>
    </div>
  );
}

export default ShareProfileModal;