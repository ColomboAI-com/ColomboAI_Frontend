import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../messages/Dropdown";
import {
  LikeIcon,
  MagicPenIcon,
  PostMoreOptionsIcon,
  RePostIcon,
} from "../Icons";
import Image from "next/image";
import ReactPlayer from "react-player";
import post_comment from "../../../public/images/icons/post_comment.svg";
import post_stats from "../../../public/images/icons/post_stats.svg";
import reply_icon from "../../../public/images/icons/reply_icon.svg";
import wallet_icon from "../../../public/images/icons/wallet_icon.svg";

const VideoAd = () => {
  const videoContainerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [adsManager, setAdsManager] = useState(null);

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
      // Initialize ad display
      initAdDisplayContainer();
    });

    const toggleVideoSize = () => {
      if (videoContainerRef.current && closeButtonRef.current) {
        const isScrolled = window.scrollY > 50;
        videoContainerRef.current.classList.toggle("small", isScrolled);
        closeButtonRef.current.style.display = isScrolled ? "block" : "none";
      }
    };

    window.addEventListener("scroll", toggleVideoSize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVideoSize);
      if (adsManager) adsManager.destroy();
    };
  }, []);

  const initAdDisplayContainer = () => {
    const videoElement = videoContainerRef.current.querySelector("video");

    // Create the ad display container
    const adDisplayContainer = new google.ima.AdDisplayContainer(
      videoContainerRef.current,
      videoElement
    );
    const adsLoader = new google.ima.AdsLoader(adDisplayContainer);

    // Handle ad loading and error events
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      (e) => onAdsManagerLoaded(e, videoElement)
    );
    adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);

    // Request ads
    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/23102803892/InstreamVideo&description_url=https%3A%2F%2Fcolomboai.com%2F&tfcd=0&npa=0&sz=640x480&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=";
    adsRequest.linearAdSlotWidth = videoElement.offsetWidth;
    adsRequest.linearAdSlotHeight = videoElement.offsetHeight;
    adsLoader.requestAds(adsRequest);
  };

  const onAdsManagerLoaded = (adsManagerLoadedEvent, videoElement) => {
    const adsManagerInstance = adsManagerLoadedEvent.getAdsManager(videoElement);
    setAdsManager(adsManagerInstance);

    adsManagerInstance.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      () => videoElement.pause()
    );
    adsManagerInstance.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      () => videoElement.play()
    );

    try {
      adsManagerInstance.init(
        videoElement.offsetWidth,
        videoElement.offsetHeight,
        google.ima.ViewMode.NORMAL
      );
      adsManagerInstance.start();
    } catch (adError) {
      console.error("AdsManager could not be started:", adError);
    }
  };

  const onAdError = (adErrorEvent) => {
    console.error("Ad error:", adErrorEvent.getError().getMessage());
  };

  const closeVideo = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.style.display = "none";
    }
  };

  return (
    <div
      className="video-container overflow-x-hidden border-[0.5px] w-full border-brandprimary sm:rounded-[10px] md:rounded-[10px] mt-5"
      id="videoContainer"
      ref={videoContainerRef}
    >
      <button
        className="close-btn"
        onClick={closeVideo}
        ref={closeButtonRef}
        style={{ display: "none" }}
      >
        ×
      </button>
      <div className="flex flex-col w-full py-[10px]">
        <div className="flex pb-2 flex-row justify-between items-center px-3">
          <p>Advertisement</p>
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
        <ReactPlayer
          width="100%"
          height="100%"
          url="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4"
          className="w-full h-auto"
          loop={true}
          muted={true}
          playing={true}
        />
        <div className="flex items-center justify-between pt-2 px-3">
          <div className="flex items-center gap-[10px] lg:gap-[19px] md:gap-[19px] xl:gap-[19px]">
            <LikeIcon />
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <button>
                <Image
                  src={post_comment}
                  alt="colombo"
                  className="md:w-full sm:w-[1.2rem]"
                />
              </button>
            </div>
            <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image
                src={post_stats}
                alt="colombo"
                className="md:w-full sm:w-[1.2rem]"
              />
            </div>
            <button className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
              <Image
                src={reply_icon}
                alt="colombo"
                className="md:w-full sm:w-[1.2rem]"
              />
            </button>
            <button>
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
