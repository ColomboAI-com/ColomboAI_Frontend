import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VibesAd() {
  const videoContainerRef = useRef(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Initialize Google IMA SDK for ads
    const initAdDisplayContainer = (videoElement) => {
      if (!videoElement) return;
      const adDisplayContainer = new window.google.ima.AdDisplayContainer(
        videoContainerRef.current,
        videoElement
      );
      const adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);

      adsLoader.addEventListener(
        window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event) => onAdsManagerLoaded(event, videoElement),
        false
      );

      adsLoader.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false
      );

      const adsRequest = new window.google.ima.AdsRequest();
      adsRequest.adTagUrl =
        "https://pubads.g.doubleclick.net/gampad/ads?iu=/23102803892/VerticalVideo&description_url=https%3A%2F%2Fcolomboai.com%2F&tfcd=0&npa=0&sz=1080x1920&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=";

      adsRequest.linearAdSlotWidth = videoContainerRef.current.offsetWidth;
      adsRequest.linearAdSlotHeight = videoContainerRef.current.offsetHeight;
      adsRequest.nonLinearAdSlotWidth = videoContainerRef.current.offsetWidth;
      adsRequest.nonLinearAdSlotHeight =
        videoContainerRef.current.offsetHeight / 3;

      adsLoader.requestAds(adsRequest);
    };

    const onAdsManagerLoaded = (adsManagerLoadedEvent, videoElement) => {
      const adsManager = adsManagerLoadedEvent.getAdsManager(videoElement);
      adsManager.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError
      );
      adsManager.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        () => videoElement.pause()
      );
      adsManager.addEventListener(
        window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        () => videoElement.play()
      );

      try {
        adsManager.init(
          videoContainerRef.current.offsetWidth,
          videoContainerRef.current.offsetHeight,
          window.google.ima.ViewMode.NORMAL
        );
        adsManager.start();
      } catch (error) {
        console.error("AdsManager could not be started:", error);
      }
    };

    const onAdError = (adErrorEvent) => {
      console.error("Ad error:", adErrorEvent.getError().getMessage());
    };

    const videoElement = document.querySelector("video");
    if (window.google && window.google.ima) {
      initAdDisplayContainer(videoElement);
    }
  }, []);

  const closeVideo = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.style.display = "none";
    }
  };

  return (
    <div className="flex items-center justify-center object-contain w-full bg-black ">
      <div
        ref={videoContainerRef}
        id="videoContainer"
        className={`relative overflow-clip hide-scrollbar border-green-400 sm:h-[calc(100dvh-0px)] md:h-[32.5] lg:h-[32.5rem] xl:h-[35rem]  aspect-[9/16] sm:w-full md:w-[470px]`}
      >
        <ReactPlayer
          className="w-full h-full"
          url="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4"
          playing={true}
          muted={true}
          width="100%"
          height="100%"
          controls={true}
          loop={true}
        />
      </div>
    </div>
  );
}
