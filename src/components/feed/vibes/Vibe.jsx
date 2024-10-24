import ThreeDotMenuViewOthers from "@/components/elements/ThreeDotMenuViewOthers";
import { VibeContext } from "@/context/VibeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import RepostVibe from "./Repost";
import ShareVibe from "./Share";
import Image from "next/image";
import { IoIosMusicalNotes } from "react-icons/io";
import LikeVibe from "./LikeVibe";
import { useMediaQuery } from "react-responsive";
import FollowButton from "@/components/elements/FollowButton";
import { WalletIcon } from "lucide-react";

import play from "../../../../public/images/icons/vibes_mobile/play.svg";
import comment from "../../../../public/images/icons/vibes_mobile/ChatCircleDots.svg";
import stats from "../../../../public/images/icons/vibes_mobile/stats.svg";
import share from "../../../../public/images/icons/vibes_mobile/share.svg";
import wallet from "../../../../public/images/icons/vibes_mobile/wallet.svg";
import pen from "../../../../public/images/icons/vibes_mobile/pen.svg";
import { GenAIPen, StatsIcon, VibesCommentIcon, VibesShareIcon, VibesViewIcon } from "@/components/Icons";

const walletIcon = "/images/icons/wallet_icon.svg";

export default function Vibe({ vibe }) {
  const [showRepost, setRepost] = useState(false);
  const [showShare, setShare] = useState(false);
  const { fetchSongById, incrementVibeImpressions, getVibeImpressions } = useContext(VibeContext);

  const [song, setSong] = useState({});
  const [isVibeInView, setIsVibeInView] = useState(false);
  const [impressions, setImpressions] = useState(0);

  const VibeViewedRef = useRef(null);
  const audioRef = useRef(null);

  const handleRepost = () => {
    setRepost(!showRepost);
  };
  const handleShare = () => {
    setShare(!showShare);
  };

  useEffect(() => {
    audioRef.current = typeof Audio !== "undefined" ? new Audio() : null;
  }, []);

  useEffect(() => {
    handleFetchImpressions(); // FETCH IMPRESSIONS - DO NOT REMOVE THIS
    const fetchSong = async () => {
      try {
        // const result = await fetchSongById("1295528");
        const result = await fetchSongById();
        setSong(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSong();
  }, []);

  //   IMPRESSION HANDLING AND PLAYING VIDEO WHEN THE VIBE IS IN VIEW
  useEffect(() => {
    // Intersection Observer to automatically call handleLoadMore when the button is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // VIBE IS IN VIEW
          handleIncreaseViewCount();
          handleFetchImpressions();
          setIsVibeInView(true);
        } else {
          // VIBE IS NOT IN VIEW
          setIsVibeInView(false);
        }
      },
      {
        root: null, // Uses the browser viewport as the default
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the button is visible
      }
    );

    if (VibeViewedRef.current) {
      observer.observe(VibeViewedRef.current);
    }

    // Cleanup the observer when the component unmounts or if button changes
    return () => {
      if (VibeViewedRef.current) {
        observer.unobserve(VibeViewedRef.current);
      }
    };
  }, []);

  const handleIncreaseViewCount = async () => {
    try {
      await incrementVibeImpressions(vibe._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchImpressions = async () => {
    const response = await getVibeImpressions(vibe._id);

    if (response.success) {
      setImpressions(response.impression.views);
    }
  };

  useEffect(() => {
    if (audioRef.current && song && song.audio) {
      audioRef.current.src = song.audio;
      audioRef.current.play().catch((error) => console.error("Error playing audio:", error));
    }
  }, [song]);

  return (
    <div className=" border-green-400 sm:h-[20rem] md:h-[calc(100vh_-_247px)] md:max-h-[calc(100vh_-_247px)] mx-[-24px] md:mx-[-40px] lg:mx-[-80px] text-white font-sans ">
      {showRepost && <RepostVibe currentState={showRepost} />}
      {showShare && <ShareVibe currentState={showShare} />}
      <div className=" flex items-center justify-center object-contain w-full bg-[#333333] ">
        {/* Main Content */}

        {/* to view the repostvibe dialog box uncomment this component */}

        {/* THIS IS USED FOR IMPRESSION AND TO MAKE SURE VIBE PLAYS AFTER THE USER SCROLLS */}
        <div className=" relative overflow-hidden border-green-400 sm:h-[20rem] md:h-[calc(100vh_-_247px)] md:max-h-[calc(100vh_-_246px)] aspect-[9/16] sm:w-[26rem] md:w-[470px]">
          <div
            ref={VibeViewedRef}
            style={{ height: "1px" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></div>

          {/* THIS IS USED FOR IMPRESSION AND TO MAKE SURE VIBE PLAYS AFTER THE USER SCROLLS */}

          {/* {vibes.length > 0 && vibes[0].type === "video" && (
            <video
              src={vibes[0].media[0]}
              className="w-full h-full"
              controls
              autoPlay
              loop
            />
          )} */}

          {vibe.type === "video" ? (
            <React.Fragment>
              {isVibeInView ? (
                <video src={vibe.media[0]} className="w-full h-full overflow-hidden" controls autoPlay loop />
              ) : null}
            </React.Fragment>
          ) : (
            <img src={vibe?.media?.[0]} className="w-full h-full" alt="vibes_content" />
          )}

          {/* {
            vibes.length &&
              vibes.map((i, index) => {
                <Fragment key={index}>
                  <Post post={i}/>
                </Fragment>
              })
          } */}

          <div className=" absolute bottom-0 left-4">
            {/* whenever there is sponsored ad uncomment and call this component */}

            {/* <SponsoredAdComponent/> */}

            {
              <div className="flex items-center gap-2  ">
                <img
                  src={vibe.creator.profile_picture}
                  alt="profile-image"
                  className="w-[36px] rounded-full"
                />
                <p>{vibe.creator.user_name}</p>
                {/* Todo: Make this button is visible if the user is on another user's profile */}
                <FollowButton userId={vibe.creator._id} />
              </div>
            }

            <div className="flex flex-wrap mx-4">
              {<p>{vibe.content}</p>}
              {song &&
                song.name &&
                song.artist_name && ( // Check if song and properties exist
                  <div className="flex gap-2 my-1">
                    <IoIosMusicalNotes className="w-[20px] h-[20px]" />
                    <p>
                      {song.name} - by {song.artist_name}
                    </p>
                  </div>
                )}
            </div>

            {/* <BannerAdComponent /> */}
          </div>
          <div className="absolute right-[1rem] top-2 md:w-[45px] flex flex-col justify-center text-[12px] sm:ml-0 md:ml-4 h-[calc(100vh_-_380px)] md:h-[calc(100vh_-_246px)]">
            <div className="flex flex-col">
              <ThreeDotMenuViewOthers vibe={vibe} />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={play} alt="colombo" className="w-[1rem]" />
                ) : (
                  <VibesViewIcon w={25} h={25} fill={"#ffffff"} />
                )}
                {/* const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); */}
                <p className="text-[10px]">121.5k</p>
              </div>
              <LikeVibe vibe={vibe} />
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={comment} alt="colombo" className="w-[1rem]" />
                ) : (
                  <VibesCommentIcon w={25} h={25} fill={"#ffffff"} />
                )}
                <p className="text-[10px]">121.5k</p>
              </div>
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={stats} alt="colombo" className="w-[1rem]" />
                ) : (
                  <StatsIcon />
                )}
                <p className="text-[10px]">{impressions}</p>
              </div>
              <div className="flex flex-col items-center gap-[2px] md:gap-1" onClick={() => handleShare()}>
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={share} alt="colombo" className="w-[1rem]" />
                ) : (
                  <VibesShareIcon w={25} h={24} fill={"#ffffff"} />
                )}
                <p className="text-[10px]">121.5k</p>
              </div>
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={wallet} alt="colombo" className="w-[1rem]" />
                ) : (
                  <WalletIcon />
                )}
                <p className="text-[10px]">$20</p>
              </div>
              {/* <div className="bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full"> */}
              {/* <GenAiIcon w={30} h={25} fill={"#ffffff"} /> */}
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={pen} alt="colombo" className="w-[2rem]" />
                ) : (
                  <GenAIPen />
                )}
              </div>
              {/* </div> */}
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                <img
                  src="/images/vibes/vibes_music.jpeg"
                  alt="vibes-music"
                  className="w-[2rem] md:w-[35px] rounded-full"
                />
              </div>
            </div>
            {/* <div className=" absolute bottom-0 lg:bottom-8 flex flex-col gap-[5px] md:gap-4 justify-center items-center text-[12px]">
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              <VibesViewIcon w={30} h={30} fill={"#ffffff"} />
              <p>121.5k</p>
            </div>
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              <VibesLikesIcon w={30} h={30} fill={"#ffffff"} />
              <p>121.5k</p>
            </div>
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              <VibesCommentIcon w={30} h={30} fill={"#ffffff"} />
              <p>121.5k</p>
            </div>
            <div
              className="flex flex-col items-center gap-[2px] md:gap-1 cursor-pointer"
              onClick={() => handleRepost()}
            >
              <VibesRepostIcon w={30} h={30} fill={"#ffffff"} />
              <p>121.5k</p>
            </div>
            <div
              className="flex flex-col items-center gap-[2px] md:gap-1"
              onClick={() => handleShare()}
            >
              <VibesShareIcon w={30} h={30} fill={"#ffffff"} />
              <p>121.5k</p>
            </div>
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              <img src={walletIcon} alt="wallet-icon" className="w-[30px] h-[30px]" />
              <p>856</p>
            </div>

            <div className="bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full">
              <GenAiIcon w={30} h={30} fill={"#ffffff"} />
            </div>
            <div>
              <img
                src="/images/vibes/vibes_music.jpeg"
                alt="vibes-music"
                className="w-[41px] rounded-full"
              />
            </div> */}
            {/* </div> */}
          </div>
        </div>

        {/* Side Options */}
      </div>
    </div>
  );
}
