/* eslint-disable @next/next/no-img-element */
import { CopyLinkIcon, CrossIcon, VibesShareIcon } from "@/components/Icons";
import { UserProfileContext } from "@/context/UserProfileContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { copyValue } from "@/utlils/commonFunctions";

const ShareProfileModal = ({ userData, showCloseButton = true }) => {
  const {
    isFollowerModalOpen,
    setIsFollowerModalOpen,
    isFollowingModalOpen,
    setIsFollowingModalOpen,
    isShareProfileModalOpen,
    setIsShareProfileModalOpen,
  } = useContext(UserProfileContext);
  const [shareProfile, setShareProfile] = useState(false);
  const profileUrl = `${window.location}/${userData?.user_name}`;

  const handlecopy = () => {
    copyValue(profileUrl);
  };

  const handleShareProfile = () => {
    setShareProfile(true);
  };

  return (
    <>
      {!shareProfile && (
        <div className="w-full flex flex-col bg-[#1E71F2] share-profile-modal">
          {showCloseButton && (
            <div className="m-6 self-end">
              <button
                className="outline-none focus:ring-offset-0 focus:ring-0"
                onClick={() => setIsShareProfileModalOpen(false)}
              >
                <CrossIcon w={20} h={20} fill={"#fff"} />
              </button>
            </div>
          )}
          <div className=" flex flex-col items-center px-12 pb-10 gap-6">
            <div className="bg-white rounded-2xl flex flex-col justify-center items-center p-3">
              <img
                src={`/images/profile/QR_code.png`}
                className=" h-full w-full p-object-cover"
                alt="QR_code"
              />
              <p className=" text-[#515151] text-2xl font-semibold">
                {" "}
                @{userData?.user_name}
              </p>
            </div>
            <button
              onClick={handlecopy}
              className="flex w-full justify-center items-center bg-white py-4 gap-4 rounded-2xl "
            >
              <CopyLinkIcon w={60} h={60} fill={"#1E71F2"} />
              <p className=" text-[#515151] text-2xl">Copy Link</p>
            </button>
            <button
              className="flex w-full justify-center items-center bg-white py-4 gap-4 rounded-2xl "
              onClick={handleShareProfile}
            >
              <VibesShareIcon w={60} h={60} fill={"#1E71F2"} />
              <p className=" text-[#515151] text-2xl">Share Profile</p>
            </button>
          </div>
        </div>
      )}

      {shareProfile && (
        <div className="w-full h-full flex flex-col items-center bg-[#1E71F2]">
          <div className="before:content-[''] before:bg-white before:block before:w-[40px] before:h-[3px] before:mx-auto before:rounded-[20px] before:mt-[8.98px]">
            <div className="flex">
              <h5 className="text-[18.51px] font-sans text-white text-center m-2">
                Share Profiles
              </h5>
              {showCloseButton && (
                <button
                  className="absolute outline-none focus:ring-offset-0 focus:ring-0 mr-5 mt-3 end-0"
                  onClick={() => setShareProfile(false)}
                >
                  <CrossIcon w={20} h={20} fill={"#fff"} />
                </button>
              )}
            </div>
          </div>
          <hr className="w-full color-white my-[18px]" />
          <div className="flex m-3 p-3 items-center flex-wrap gap-y-[9px] gap-[7.95px] px-[12px]">
            <Link
              href={`https://www.instagram.com/?url=${encodeURIComponent(
                profileUrl
              )}`}
              target="_blank"
            >
              <img src="/images/shareicon/instagram.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Instagram
              </p>
            </Link>
            <Link href={"https://www.messenger.com/"} target="_blank">
              <img src="/images/shareicon/fb-messenger.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Messanger
              </p>
            </Link>
            <Link
              href={`https://www.facebook.com/sharer.php?u=${profileUrl}`}
              target="_blank"
            >
              <img alt="" src="/images/shareicon/facebook.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Facebook
              </p>
            </Link>
            <Link
              href={`https://api.whatsapp.com/send?phone=&text=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/whatsapp.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                WhatsAapp
              </p>
            </Link>
            <Link
              href={`https://twitter.com/share?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/twitter.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                X
              </p>
            </Link>
            <Link
              href={`https://reddit.com/submit?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/reddit.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Reddit
              </p>
            </Link>
            <Link
              href={`https://pinterest.com/pin/create/bookmarklet/?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/pintrest.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Pintrest
              </p>
            </Link>
            <Link
              href={`https://telegram.me/share/url?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/telegram.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Telegram
              </p>
            </Link>
            <Link
              href={`https://www.tumblr.com/share/link?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/tumblr.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Tumblr
              </p>
            </Link>
            <Link
              href={`https://www.linkedin.com/shareArticle?url=${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/linkedin.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Linkedin
              </p>
            </Link>
            <Link
              href={`mailto:?body=Check out this site ${profileUrl}`}
              target="_blank"
            >
              <img src="/images/shareicon/email.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                Email
              </p>
            </Link>
            <Link href={"#"} target="_blank">
              <img src="/images/shareicon/sms.svg" />
              <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                SMS
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareProfileModal;
