"use client";
import ProfilePicture from "@/components/elements/ProfilePicture";
import { useState, useEffect, useRef } from "react";
import {
  RePostIcon,
  PlusIcon,
  FacebookIcon,
  SendIconCopy,
  InstagramIcon,
  WhatsAppIcon,
  EmailIcon,
  SMSIcon,
  XIcon,
  RedditIcon,
  PinterestIcon,
  TelegramIcon,
  TumblrIcon,
  LinkedinIcon,
  MessengerIcon,
  RectangleBar,
} from "@/components/Icons";
import { copyValue } from "@/utlils/commonFunctions";
import Link from "next/link";

export default function ShareVibe({ currentState, vibeId }) {
  const [isVisible, setIsVisible] = useState(currentState);
  const vibeURL = `${window.location.href}/${vibeId}`;
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleVisibility();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, handleVisibility]);

  // const copyToClipboard = (param1) => {
  //   navigator.clipboard
  //     .writeText(param1)
  //     .then(() => {})
  //     .catch((err) => {
  //       console.error("Failed to copy text: ", err);
  //     });
  // };

  const handleCopy = () => {
    copyValue(vibeURL);
  };

  // console.log(vibeId);

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
          <div
            className="bg-[#1E71F2]    
 rounded-[20px] h-[440px] w-[430px]  border border-white "
            ref={dialogRef}
          >
            <div className="mt-[9px]">
              <div
                className="flex justify-center cursor-pointer"
                onClick={() => handleVisibility()}
              >
                <RectangleBar />
              </div>
              <div className="flex justify-center mt-[9px] text-[18px] font-[700]">
                Share or Re-Post
              </div>
            </div>

            <div className="mt-[25px] flex justify-between mx-auto h-[76px] w-[376px]">
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%] flex justify-center items-center ">
                  <RePostIcon fill={"#1E71F2"} w={33} h={33} />
                </div>
                <div className="flex justify-center">Repost</div>
              </div>
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%] flex items-center justify-center">
                  <PlusIcon />
                </div>
                <div className="flex justify-center">Your Story</div>
              </div>
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%] flex items-center justify-center">
                  <SendIconCopy />
                </div>
                <div className="flex justify-center">Send to</div>
              </div>
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%]">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/6771/dc70/a846fb6570e738349ae96c0f8edddf89?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kaxkqK6AUz1TlBM6jBB~HCOVi7gmea8x5RakfqRq~6FAXmcfWdHx1dChJ4kHEyoLGzvM3D3q-ACIfzPtSpPyONEuBbmtEhGl~R370vG248rV918SMc1fdjNtHXfGVKgyypDIuZa6T5tS9Dy9cjdsyeRMSX2IpvXl2JnvUl760oNopq0ovKCG8co6u82ePmMyRVGgiilnxbJ5IUp6mYBNkZYmykHIfrlLv~hkHE18VbvUEZ9V72tFK5Li3YdvhXWIoIbVSyrDOFh7Jbm6W5nvZ0gCgpJTtSJYAZO~ULvWNVnNfLOdQ~xUtrLwpcqWiecC~zJJSPLE-8QmV5BYHPl1Dg__"
                    alt="Anna X"
                    className="h-full w-full rounded-[50%]"
                  />
                </div>
                <div className="flex justify-center">Anna X</div>
              </div>
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%]">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/27df/6da0/aff737baa08e22da524c95a696eb69f6?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=au2K9bd-IAmicVwx4fOqbww3VL~EXh5M6Id9judedoYTR6YIymQ-iWt2ugYBrpqdKjGWeq2fNppZzL~~s4u-4PxrcaA1wtMud1nJxSaLNbHyf-~Jq-IjQyL0OXitLHUx2LBv6bNIOFMp-UcgeS-VhKU18MlQRV6HNQaF1-T8~d9jOrcI~ZJRkhnBqm67L9B7EsHZnQLgP62EwDjY4tT2gqVJgx51xpsowkPec0WmK97SqQD5gX6TRzUDC9h3bHRMWVgneBZ7sxnHqM7U4JqNlFfa1YFTkhNSxXZRXWG4PvyYd13IbY3KHV5VJDj2LGhO5hoxCoKizIBBf76CSN0fkA__"
                    alt="Anna XS"
                    className="h-full w-full rounded-[50%]"
                  />
                </div>
                <div className="flex justify-center">Anna XS</div>
              </div>
              <div className="w-[56px] h-[76px] text-[12px]">
                <div className="bg-white h-[56px] w-[56px] rounded-[50%]">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/6ebe/9b36/cc79e6880ce26ce0e7a1c2f0ca6dad68?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gUJQyf0aTuiiM~afN6~9U-wKh~crTdJZPlis4zGy1B0NCyJcCShqai2PkbqVDxYixNZKP8-HJnG2VGE0XZGlVLfoq41ydKdu05OFLGN~uzHXgdLYkooiLqQqat4Pb7-KuUvlzbXj6hpARWZEUktPbkpZ~rLuqus37kfxCiLACwlfBZYK225tbuxe6ZWNhriC9QojYVN3g7Lxyvfx5uhEh0K76bJRIpPRVnmGL5TeOGSMT55JnyA693cTYoEnK4M-SEqYYM5wRZJX1qYO4aKV4riHwGrEaMfZ7CI09m80IGJPXwzQlDn6IbWueAwiGVD1wATzpGMl-PkNGi~6xCQiYg__"
                    alt="Anna XV"
                    className="h-full w-full rounded-[50%]"
                  />
                </div>
                <div className="flex justify-center">Anna XV</div>
              </div>
            </div>
            <hr className="mt-[17px] mb-[19px] mx-4" />
            <div className="mt-4 mb-[19px]  flex flex-wrap justify-between mx-auto w-[376px] h-[157px]">
              <div className=" w-[56px] h-[74px] text-[12px] mb-[9px]">
                <Link
                  href={`https://www.instagram.com/?url=${encodeURIComponent(
                    vibeURL
                  )}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/instagram.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Instagram
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px] mb-[9px]">
                {/* <div className="bg-white h-[56px] w-[56px] rounded-[50%] flex justify-center items-center">
                  <MessengerIcon />
                </div>
                <div className="flex justify-center">Messenger</div> */}
                <Link
                  href={`https://www.facebook.com/dialog/send?link=${encodeURIComponent(
                    vibeURL
                  )}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(
                    vibeURL
                  )}`}
                  target="_blank"
                >
                  <div className="bg-white h-[56px] w-[56px] rounded-[50%] flex justify-center items-center">
                    <MessengerIcon />
                  </div>
                  <div className="flex justify-center">Messenger</div>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px] mb-[9px]">
                <Link
                  href={`https://www.facebook.com/sharer.php?u=${vibeURL}`}
                  target="_blank"
                >
                  <img alt="" src="/images/shareicon/facebook.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Facebook
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px] mb-[9px]">
                <Link
                  href={`https://api.whatsapp.com/send?phone=&text=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/whatsapp.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    WhatsApp
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px] mb-[9px]">
                <Link
                  href={`https://twitter.com/share?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/twitter.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    X
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px] mb-[9px]">
                <Link
                  href={`https://reddit.com/submit?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/reddit.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Reddit
                  </p>
                </Link>
              </div>

              <div className="w-[56px] h-[74px] text-[12px]">
                <Link
                  href={`https://pinterest.com/pin/create/bookmarklet/?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/pintrest.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Pintrest
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px]">
                <Link
                  href={`https://telegram.me/share/url?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/telegram.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Telegram
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px]">
                <Link
                  href={`https://www.tumblr.com/share/link?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/tumblr.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Tumblr
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px]">
                <Link
                  href={`https://www.linkedin.com/shareArticle?url=${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/linkedin.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Linkedin
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px]">
                <Link
                  href={`mailto:?body=Check out this site ${vibeURL}`}
                  target="_blank"
                >
                  <img src="/images/shareicon/email.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    Email
                  </p>
                </Link>
              </div>
              <div className="w-[56px] h-[74px] text-[12px]">
                <Link href={"#"} target="_blank">
                  <img src="/images/shareicon/sms.svg" />
                  <p className="text-[10.01px] font-sans text-white text-center mt-[6px]">
                    SMS
                  </p>
                </Link>
              </div>
            </div>

            <hr className="mx-4" />
            <div className="flex justify-between mt-[14px] w-[400px] h-[30px] mx-auto">
              <button
                className="w-[78%] bg-white text-[#1E71F2] text-[12px] rounded-2xl w-[314px] h-[30px]"
                // onClick={() =>
                //   copyToClipboard(
                //     "https://post.colomboai.com/660ad7b3053e33a40c...."
                //   )
                // }
                onClick={handleCopy}
              >
                {/* https://post.colomboai.com/660ad7b3053e33a40c.... */}
                {vibeURL}
              </button>
              <button
                // onClick={() =>
                //   copyToClipboard(
                //     "https://post.colomboai.com/660ad7b3053e33a40c...."
                //   )
                // }
                onClick={handleCopy}
                className="w-[20%] bg-white text-[14px] text-[#1E71F2] rounded-2xl w-[80px] h-[30px]"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
