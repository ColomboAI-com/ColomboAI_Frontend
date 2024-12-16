import ThreeDotMenuViewOthers from "@/components/elements/ThreeDotMenuViewOthers";
import ThreeDotMenuViewOthersHorizontal from "@/components/elements/ThreeDotMenuViewOthersHorizontal";
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
import Link from "next/link";

import play from "../../../../public/images/icons/vibes_mobile/play.svg";
import comment from "../../../../public/images/icons/vibes_mobile/ChatCircleDots.svg";
import stats from "../../../../public/images/icons/vibes_mobile/stats.svg";
import share from "../../../../public/images/icons/vibes_mobile/share.svg";
import wallet from "../../../../public/images/icons/vibes_mobile/wallet.svg";
import pen from "../../../../public/images/icons/vibes_mobile/pen.svg";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

import {
  GenAIPen,
  StatsIcon,
  VibesCommentIcon,
  VibesShareIcon,
  VibesViewIcon,
  VibesLikesIcon,
  VibesRepostIcon,
  GenAiIcon,
} from "@/components/Icons";
import { UserProfileContext } from "@/context/UserProfileContext";
import { MdOutlineArrowBack } from "react-icons/md";

const walletIcon = "/images/icons/wallet_icon.svg";

export default function Vibe({ vibe, index }) {
  const router = useRouter();
  const [showRepost, setRepost] = useState(false);
  const [showShare, setShare] = useState(false);
  const { fetchSongById, incrementVibeImpressions, getVibeImpressions, fetchVibeWallet } =
    useContext(VibeContext);

  const { userDetails } = useContext(UserProfileContext);
  const [song, setSong] = useState({});
  const [isVibeInView, setIsVibeInView] = useState(false);
  const [impressions, setImpressions] = useState(0);
  const [isFollowing, setIsFollowing] = useState(vibe.following);
  const VibeViewedRef = useRef(null);
  const audioRef = useRef(null);
  const hasFetchedSong = useRef(false);
  const [seeMore, setSeeMore] = useState(false);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  const [wallet, setWallet] = useState(0);

  const handleRepost = () => {
    setRepost(!showRepost);
  };
  const handleShare = () => {
    setShare(!showShare);
  };

  useEffect(() => {
    audioRef.current = typeof Audio !== "undefined" ? new Audio() : null;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handleFetchVibeWallet = async () => {
    try {
      const response = await fetchVibeWallet(vibe._id);

      if (response.success) {
        setWallet(response.data.amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  GENERATE WALLET REVENUE - OBSOLETE (NOT NEEDED ANYMORE)
  // const handleGenerateWalletRevenue = async (adRevenue) => {
  //   try {
  //     const response = awai(vibe._id, adRevenue);
  //     if (response.success) {
  //       setWallet(response.data.amount);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    handleFetchImpressions(); // FETCH IMPRESSIONS - DO NOT REMOVE THIS
    handleFetchVibeWallet(); // Fetch Wallet
  }, []);

  //   IMPRESSION HANDLING AND PLAYING VIDEO WHEN THE VIBE IS IN VIEW
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // VIBE IS IN VIEW
          setIsVibeInView(true);
          handleIncreaseViewCount();
          handleFetchImpressions();

          if (!hasFetchedSong.current && vibe.song_id) {
            try {
              hasFetchedSong.current = true;
              const result = await fetchSongById(vibe.song_id);
              setSong(result[0]);

              if (audioRef.current && result[0]?.audio) {
                audioRef.current.src = result[0].audio;
                audioRef.current.play().catch((error) => {
                  console.log("Playback requires user interaction:", error);
                });
              }
            } catch (error) {
              console.log("Error fetching song:", error);
            }
          } else if (audioRef.current && audioRef.current.src) {
            audioRef.current.play().catch((error) => {
              console.log("Playback requires user interaction:", error);
            });
          }
        } else {
          // VIBE IS NOT IN VIEW
          setIsVibeInView(false);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7, // Adjust this threshold as needed
      }
    );

    if (VibeViewedRef.current) {
      observer.observe(VibeViewedRef.current);
    }

    return () => {
      if (VibeViewedRef.current) {
        observer.unobserve(VibeViewedRef.current);
      }
    };
  }, [vibe.song_id]);

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
  const handleFollowToggle = (updatedFollowState) => {
    setIsFollowing(updatedFollowState); // Update the follow state when the button is toggled
  };

  return (
    <div className="relative border-green-400 hide-scrollbar sm:h-[calc(100vh-0px)] md:h-[37rem] lg:h-[32.5rem] sm:mx-0 md:mx-[-40px] lg:mx-[-80px] text-white font-sans ">
      {showRepost && <RepostVibe currentState={showRepost} vibe={vibe} />}
      {showShare && <ShareVibe currentState={showShare} vibeId={vibe._id} />}
      <div className=" flex items-center justify-center object-contain w-full bg-black ">
        {/* Main Content */}

        {/* to view the repostvibe dialog box uncomment this component */}

        {/* THIS IS USED FOR IMPRESSION AND TO MAKE SURE VIBE PLAYS AFTER THE USER SCROLLS */}
        <div
          className={` relative overflow-clip hide-scrollbar border-green-400 sm:h-[calc(100vh-0px)] md:h-[32.5] lg:h-[32.5rem] xl:h-[35rem]  aspect-[9/16] sm:w-full md:w-[470px]`}
        >
          <div
            ref={VibeViewedRef}
            style={{ height: "1px" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></div>

          {/* THIS IS USED FOR IMPRESSION AND TO MAKE SURE VIBE PLAYS AFTER THE USER SCROLLS */}

          {/* {vibes.length > 0 && vibes[0].type === "video" && (
            <ReactPlayer
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
                <ReactPlayer
                  url={vibe.media[0]}
                  className="w-full h-full overflow-visible"
                  controls
                  playing={true}
                  loop={true}
                  muted={true}
                  playsinline={true}
                  config={{
                    file: {
                      attributes: {
                        type: "video/mp4",
                      },
                    },
                  }}
                />
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
          <div className="md:hidden absolute top-8 left-4 flex flex-row items-center gap-2">
            <Link href={"/feed"}>
              <MdOutlineArrowBack size={24} />
            </Link>
            <p className="text-lg">Vibes</p>
          </div>

          <div className="md:hidden absolute top-8 right-2">
            <ThreeDotMenuViewOthersHorizontal vibe={vibe} />
          </div>
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
                <FollowButton
                  userId={vibe.creator._id}
                  creatorName={vibe.creator.name}
                  isFollowing={vibe.following}
                  onToggle={handleFollowToggle}
                />
              </div>
            }

            <div
              className={`flex flex-wrap flex-col md:mx-4 sm:mx-8 ${vibe.type == "video" ? `sm:mb-[3.5rem]` : `sm:mb-2`
                }`}
            >
              <p className="leading-5">
                {vibe.content.length > 130
                  ? seeMore
                    ? vibe.content
                    : `${vibe.content.slice(0, 130)}... `
                  : vibe.content}
                {vibe.content.length > 130 && (
                  <span onClick={toggleSeeMore} style={{ color: "#276ab3", cursor: "pointer" }}>
                    {seeMore ? "see less" : "see more"}
                  </span>
                )}
              </p>
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
          <div className="absolute right-[0.2rem] bottom-[2rem] flex flex-col justify-center text-[12px] sm:ml-0 md:ml-4 md:hidden">
            {/* <div className="flex flex-col">
              <ThreeDotMenuViewOthers vibe={vibe} />
            </div> */}
            <div className="flex flex-col gap-[0.5rem]">
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
                <p className="text-[10px]">{wallet}</p>
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
          </div>
        </div>

        {/* Side Options */}
        <div className="absolute sm:hidden md:block md:right-[14.5rem] md:top-[6rem] lg:right-[23rem] lg:bottom-0 lg:top-[2.5rem] xl:right-[20rem] xl:top-[8rem] flex flex-col gap-[5px] md:gap-4 justify-center items-center text-[12px]">
          <div className="flex flex-col items-center gap-[2px] md:gap-1">
            <ThreeDotMenuViewOthers vibe={vibe} />
          </div>
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
          <div className="flex flex-col items-center gap-[2px] md:gap-1" onClick={() => handleShare()}>
            <VibesShareIcon w={30} h={30} fill={"#ffffff"} />
            <p>121.5k</p>
          </div>
          <div className="flex flex-col items-center gap-[2px] md:gap-1">
            <img src={walletIcon} alt="wallet-icon" className="w-[30px] h-[30px]" />
            <p>{wallet}</p>
          </div>

          <div className="bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full">
            <GenAiIcon w={30} h={30} fill={"#ffffff"} />
          </div>
          <div>
            <img src="/images/vibes/vibes_music.jpeg" alt="vibes-music" className="w-[41px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
