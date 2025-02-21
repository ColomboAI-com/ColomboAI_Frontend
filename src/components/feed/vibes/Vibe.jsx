import ThreeDotMenuViewOthers from "@/components/elements/ThreeDotMenuViewOthers";
import ThreeDotMenuViewOthersHorizontal from "@/components/elements/ThreeDotMenuViewOthersHorizontal";
import { VibeContext } from "@/context/VibeContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import RepostVibe from "./Repost";
import ShareVibe from "./Share";
import Image from "next/image";
import { IoIosMusicalNotes, IoMdAddCircleOutline } from "react-icons/io";
import LikeVibe from "./LikeVibe";
import { useMediaQuery } from "react-responsive";
import FollowButton from "@/components/elements/FollowButton";
import Link from "next/link";
import { Play, Pause } from "lucide-react";

import play from "../../../../public/images/icons/vibes_mobile/play.svg";
import comment from "../../../../public/images/icons/vibes_mobile/ChatCircleDots.svg";
import stats from "../../../../public/images/icons/vibes_mobile/stats.svg";
import share from "../../../../public/images/icons/vibes_mobile/share.svg";
import wallet from "../../../../public/images/icons/vibes_mobile/wallet.svg";
import pen from "../../../../public/images/icons/vibes_mobile/pen.svg";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import axios from "axios";
import {
  GenAIPen,
  StatsIcon,
  VibesCommentIcon,
  VibesShareIcon,
  VibesViewIcon,
  VibesLikesIcon,
  VibesRepostIcon,
  GenAiIcon,
  WalletIcon,
  PlusIcon,
} from "@/components/Icons";
import { UserProfileContext } from "@/context/UserProfileContext";
import { MdOutlineArrowBack } from "react-icons/md";
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL";
import { getCookie } from "@/utlils/cookies";
import CreateDropdown from "@/components/elements/CreateDropdown";
import { GlobalContext } from "@/context/GlobalContext";

const walletIcon = "/images/icons/wallet_icon.svg";

export default function Vibe({ vibe, index }) {
  const router = useRouter();
  const [showRepost, setRepost] = useState(false);
  const [showShare, setShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const { fetchSongById, incrementVibeImpressions, getVibeImpressions, fetchVibeWallet } =
    useContext(VibeContext);
  const { setIsCreateVibeOpen } = useContext(GlobalContext);

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
  const playerRef = useRef(null);

  const [wallet, setWallet] = useState(0);
  const [showPlayerStatus, setShowPlayerStatus] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowPlayerStatus(true);
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

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

  useEffect(() => {
    console.log(vibe);
    axios
      .get(`${ROOT_URL_FEED}/vibes/feed/${vibe._id}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      })
      .then((res) => {
        console.log(res, "vibe details");
      });
  }, [vibe]);

  console.log(song, "song");

  return (
    <div className="relative border-green-400 hide-scrollbar sm:h-[calc(100vh-0px)] bg-[#333] md:h-full sm:mx-0 md:mx-[-40px] lg:mx-[-80px] text-white font-sans ">
      {showRepost && <RepostVibe currentState={showRepost} vibe={vibe} />}
      {showShare && (
        <div className="fixed [&>div>div]:!relative top-0 left-0 w-full h-full z-50 flex justify-center items-center">
          <div className="h-full mr-12">
            <ShareVibe currentState={showShare} vibeId={vibe._id} onClose={() => setShowShare(false)} />
          </div>
        </div>
      )}
      <div className=" flex items-center justify-center object-contain w-full bg-[#333] h-full">
        {/* Main Content */}

        {/* to view the repostvibe dialog box uncomment this component */}

        {/* THIS IS USED FOR IMPRESSION AND TO MAKE SURE VIBE PLAYS AFTER THE USER SCROLLS */}
        <div
          className={` relative overflow-clip bg-black md:rounded-[20px] hide-scrollbar border-green-400 sm:h-[calc(100dvh-0px)] md:h-[calc(100%-3rem)]  aspect-[9/16] sm:w-full md:w-[470px]`}
          onClick={() => {
            console.log("clicked");
            handlePlayPause();
          }}
          role="button"
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
                  controls={false}
                  playing={true}
                  loop={true}
                  muted={!isPlaying}
                  width="100%"
                  height="100%"
                  playsinline={true}
                  ref={playerRef}
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
            <img src={vibe?.media?.[0]} className="w-full h-full object-cover" alt="vibes_content" />
          )}

          {/* {
            vibes.length &&
              vibes.map((i, index) => {
                <Fragment key={index}>
                  <Post post={i}/>
                </Fragment>
              })
          } */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="md:hidden absolute top-8 left-4 flex flex-row items-center gap-2"
          >
            <Link href={"/feed"}>
              <MdOutlineArrowBack size={24} />
            </Link>
            <p className="text-lg">Vibes</p>
          </div>

          <div className="md:hidden absolute top-8 right-2" onClick={(e) => e.stopPropagation()}>
            <ThreeDotMenuViewOthersHorizontal vibe={vibe} />
            <button className="mt-1" onClick={() => setIsCreateVibeOpen(true)}>
              <IoMdAddCircleOutline className="w-7 h-7 tall:w-6 tall:h-6" fill={"#FFFFFF"} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-4">
            {/* whenever there is sponsored ad uncomment and call this component */}

            {/* <SponsoredAdComponent/> */}

            {
              <div className="flex items-center gap-2  " onClick={(e) => e.stopPropagation()}>
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

            <div className={`flex flex-wrap flex-col mt-2 mb-3`}>
              <p className="leading-5 text-base tracking-[0.30px]">
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
                  <div className="flex gap-2 mt-2">
                    <IoIosMusicalNotes className="w-[20px] h-[20px]" />
                    <p className="text-base font-semibold">
                      {song.name} - by {song.artist_name}
                    </p>
                  </div>
                )}
            </div>

            {/* <BannerAdComponent /> */}
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-[0.2rem] bottom-[2rem] flex flex-col justify-center text-[12px] sm:ml-0 md:ml-4 md:hidden"
          >
            {/* <div className="flex flex-col">
              <ThreeDotMenuViewOthers vibe={vibe} />
            </div> */}
            <div className="flex flex-col gap-[0.5rem]">
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={play} alt="colombo" className="w-7" />
                ) : (
                  <VibesViewIcon w={25} h={25} fill={"#ffffff"} />
                )}
                {/* const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); */}
                <p className="text-[10px]">{impressions}</p>
              </div>
              <LikeVibe vibe={vibe} />
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={comment} alt="colombo" className="w-7" />
                ) : (
                  <VibesCommentIcon w={25} h={25} fill={"#ffffff"} />
                )}
                <p className="text-[10px]">{vibe?.counts?.comments || 0}</p>
              </div>
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={stats} alt="colombo" className="w-7" />
                ) : (
                  <StatsIcon />
                )}
                <p className="text-[10px]">{impressions}</p>
              </div>
              <div
                className="flex flex-col items-center gap-[2px] md:gap-1"
                onClick={() => handleShare()}
                role="button"
              >
                {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <Image src={share} alt="colombo" className="w-7" />
                ) : (
                  <VibesShareIcon w={25} h={24} fill={"#ffffff"} />
                )}
                <p className="text-[10px]">121.5k</p>
              </div>
              <div className="flex flex-col items-center gap-[2px] md:gap-1">
                {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
                {/* {useMediaQuery({ query: "(max-width: 767px)" }) ? (
                  <img
                    src={walletIcon}
                    alt="colombo"
                    className="w-7 [&_path]:fill-white"
                  />
                ) : ( */}
                <WalletIcon className="w-7 [&_path]:fill-white" />
                {/* )} */}
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
              {song?.name && (
                <div className="flex flex-col items-center gap-[2px] md:gap-1">
                  <img
                    src={song?.album_image || "/images/vibes/vibes_music.jpeg"}
                    alt="vibes-music"
                    className="w-[2rem] md:w-[35px] rounded-full"
                  />
                </div>
              )}
              <div role="button" onClick={handlePlayPause} className="flex items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-black p-1.5">
                  {isPlaying ? <Play size={16} /> : <Pause size={16} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Side Options */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-[calc(100%-50px)] top-0 bottom-[24px] absolute sm:hidden md:block md:relative md:right-[unset] md:top-[0px] md:bottom-[24px] md:ml-2"
        >
          <div className="flex flex-col justify-between gap-[2px] h-full">
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              <ThreeDotMenuViewOthers vibe={vibe} />
              <button onClick={() => setIsCreateVibeOpen(true)}>
                <IoMdAddCircleOutline className="w-7 h-7 tall:w-6 tall:h-6" fill={"#FFFFFF"} />
              </button>
            </div>
            <div className="flex flex-col gap-[5px] md:gap-2 justify-between items-center text-[12px]">
              <div
                className="flex flex-col items-center gap-[2px]"
                onClick={() => handleRepost()}
                role="button"
              >
                <VibesViewIcon className="w-[30px] h-[30px] tall:w-6 tall:h-6" fill={"#ffffff"} />
                <p>{vibe?.counts?.reposts || 0}</p>
              </div>
              <LikeVibe vibe={vibe} />
              <div className="flex flex-col items-center gap-[2px] ">
                <VibesCommentIcon className="w-[30px] h-[30px] tall:w-6 tall:h-6" fill={"#ffffff"} />
                <p>{vibe?.counts?.comments || 0}</p>
              </div>
              <div className="flex flex-col items-center gap-[2px]">
                <StatsIcon className="w-[30px] h-[30px] tall:w-6 tall:h-6 [&_path]:stroke-white" />
                <p>{impressions}</p>
              </div>
              <div
                className="flex flex-col items-center gap-[2px] "
                onClick={() => handleShare()}
                role="button"
              >
                <VibesShareIcon className="w-[30px] h-[30px] tall:w-6 tall:h-6" fill={"#ffffff"} />
                {/* <p>121.5k</p> */}
              </div>
              <div className="flex flex-col items-center gap-[2px] ">
                {/* <img
                  src={walletIcon}
                  alt="wallet-icon"
                  className="w-[30px] h-[30px] [&_path]:fill-white"
                /> */}
                <WalletIcon className="w-[30px] h-[30px] [&_path]:fill-white" />
                <p>{wallet}</p>
              </div>

              <div className="bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full">
                <GenAiIcon w={30} h={30} fill={"#ffffff"} />
              </div>
              {song?.name && (
                <div>
                  <img
                    src={song?.album_image || "/images/vibes/vibes_music.jpeg"}
                    alt="vibes-music"
                    className="w-[41px] rounded-full"
                  />
                </div>
              )}

              <div role="button" onClick={handlePlayPause} className="flex items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-black p-1.5">
                  {isPlaying ? <Play size={16} /> : <Pause size={16} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
