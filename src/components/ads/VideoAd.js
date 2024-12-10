import React, { useEffect } from "react";
import Dropdown from "../messages/Dropdown";
import { LikeIcon, MagicPenIcon, PostMoreOptionsIcon, RePostIcon } from "../Icons";
import Image from "next/image";
import post_comment from "../../../public/images/icons/post_comment.svg";
import post_stats from "../../../public/images/icons/post_stats.svg";
import reply_icon from "../../../public/images/icons/reply_icon.svg";
import wallet_icon from "../../../public/images/icons/wallet_icon.svg";

const VideoAd = () => {
  useEffect(() => {
    // Load external scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load required scripts
    Promise.all([
      loadScript("https://vjs.zencdn.net/7.18.1/video.js"),
      loadScript("https://imasdk.googleapis.com/js/sdkloader/ima3.js"),
    ]).then(() => {
      // Initialize Video.js
      const videoPlayer = window.videojs("content_video", {
        autoplay: true,
        muted: true,
        controls: true, // Enable/disable controls as needed
        debug: false, // Explicitly disable debugging
        loadingSpinner: false,
        errorDisplay: false,
        textTrackSettings: false,
        bigPlayButton: false,
        controlBar: false,
      });

      const videoContainer = document.getElementById("videoContainer");

      const toggleVideoSize = () => {
        const closeButton = document.querySelector(".close-btn");
        if (window.scrollY > 50) {
          videoContainer.classList.add("small");
          closeButton.style.display = "block";
        } else {
          videoContainer.classList.remove("small");
          closeButton.style.display = "none";
        }
      };

      window.addEventListener("scroll", toggleVideoSize);

      // Clean up resources and event listeners on component unmount
      return () => {
        videoPlayer.dispose();
        window.removeEventListener("scroll", toggleVideoSize);
      };
    });
  }, []);

  return (
    <div
      className="overflow-x-hidden border-[0.5px] w-full border-brandprimary sm:rounded-[10px] md:rounded-[10px] mt-5"
      id="videoContainer"
    >
      <div className="flex flex-col w-full py-[10px]">
        <div className="flex pb-2 flex-row justify-between items-center px-3">
          <p className="">Advertisement</p>
          <div className="flex flex-row items-center gap-2">
            <p className="text-gray-400">Sponsored</p>
            <Dropdown
              offset={[0, 10]}
              placement="bottom-start"
              btnClassName="flex justify-center items-center rounded-full hover:text-brandprimary cursor-pointer"
              button={<PostMoreOptionsIcon w={30} h={30} fill={"#A7A7A7"} />}
            />
          </div>
        </div>
        <video id="content_video" className="w-full h-auto" preload="auto" muted autoPlay controls={true}>
          <source
            src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="flex items-center justify-between pt-2 px-3">
          <div className="flex items-center gap-[10px] lg:gap-[19px] md:gap-[19px] xl:gap-[19px]">
            <LikeIcon />
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <button>
                <Image src={post_comment} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
              </button>
            </div>
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={post_stats} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            </div>
            <button className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={reply_icon} alt="colombo" className="md:w-full sm:w-[1.2rem]" />
            </button>
            <button className="">
              <RePostIcon />
            </button>
          </div>
          <div className="flex items-center lg:gap-[19px] md:gap-[19px] gap-[10px]">
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <MagicPenIcon />
            </div>
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image src={wallet_icon} alt="colombo" width={28} height={27} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAd;
