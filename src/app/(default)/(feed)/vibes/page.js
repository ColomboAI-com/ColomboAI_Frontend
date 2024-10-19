/* eslint-disable @next/next/no-img-element */
"use client";
import {
  GenAiIcon,
  GenAIPen,
  StatsIcon,
  VibesCommentIcon,
  VibesLikesIcon,
  VibesRepostIcon,
  VibesSaveIcon,
  VibesShareIcon,
  VibesViewIcon,
  WalletIcon,
} from "@/components/Icons";
import FollowButton from "@/components/elements/FollowButton";
const walletIcon = "/images/icons/wallet_icon.svg";


import ThreeDotMenuViewOthers from "@/components/elements/ThreeDotMenuViewOthers";
import RenderFeed from "@/components/feed/post/RenderFeed";
import post_stats from "../../../../../public/images/icons/post_stats.svg";
import Image from "next/image";
import { IoIosMusicalNotes } from "react-icons/io";
import RepostVibe from "@/components/feed/vibes/Repost";
import ShareVibe from "@/components/feed/vibes/Share";
import { Fragment, useContext, useEffect, useState } from "react";
import BannerAdComponent from "@/components/feed/vibes/BannerAd";
import SponsoredAdComponent from "@/components/feed/vibes/SponsoredAd";
import { VibeContext } from "@/context/VibeContext";
import Post from "@/components/elements/cards/Post";
import LikeVibe from "@/components/feed/vibes/LikeVibe";
import { useMediaQuery } from "react-responsive";
import play from "../../../../../public/images/icons/vibes_mobile/play.svg"
import comment from "../../../../../public/images/icons/vibes_mobile/ChatCircleDots.svg"
import stats from "../../../../../public/images/icons/vibes_mobile/stats.svg"
import share from "../../../../../public/images/icons/vibes_mobile/share.svg"
import wallet from "../../../../../public/images/icons/vibes_mobile/wallet.svg"
import pen from "../../../../../public/images/icons/vibes_mobile/pen.svg"


export default function Vibes({ filter }) {
  const [showRepost, setRepost] = useState(false);
  const [showShare, setShare] = useState(false);
  const handleRepost = () => {
    setRepost(!showRepost);
  };
  const handleShare = () => {
    setShare(!showShare);
  };
  const { vibes, getVibes, loadings, page, resetFeedValues, fetchSongById } =
    useContext(VibeContext);
  const [song, setSong] = useState({});
  const [vibe, setVibe] = useState({});

  useEffect(() => {
    getVibes();

    const fetchSong = async () => {
      try {
        // const result = await fetchSongById("1129600");
        const result = await fetchSongById();
        setSong(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSong();
  }, []);

  useEffect (() => {
    if (vibes) {
      setVibe(vibes[0]);
    }
  })


  return (
    <div className=" border-green-400 sm:h-[20rem] md:h-[calc(100vh_-_247px)] md:max-h-[calc(100vh_-_247px)] mx-[-24px] md:mx-[-40px] lg:mx-[-80px] text-white font-sans ">
      {showRepost && <RepostVibe currentState={showRepost} />}
      {showShare && <ShareVibe currentState={showShare} />}
      <div className=" flex items-center justify-center object-contain w-full bg-[#333333] ">
        {/* Main Content */}

        {/* to view the repostvibe dialog box uncomment this component */}

        <div className=" relative overflow-hidden border-green-400 sm:h-[20rem] md:h-[calc(100vh_-_247px)] md:max-h-[calc(100vh_-_246px)] aspect-[9/16] sm:w-[26rem] md:w-[470px]">
          {/* {vibes.length > 0 && vibes[0].type === "video" && (
            <video
              src={vibes[0].media[0]}
              className="w-full h-full"
              controls
              autoPlay
              loop
            />
          )} */}

          {vibes.length > 0 && vibes[0].type === "video" ? (
            <video
              src={vibes[0].media[0]}
              className="w-full h-full overflow-hidden"
              controls
              autoPlay
              loop
            />
          ) : (
            <img
              src={vibes[0]?.media?.[0]}
              className="w-full h-full"
              alt="vibes_content"
            />
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

            {vibes.length > 0 && (
              <div className="flex items-center gap-2  ">
                <img
                  src={vibes[0].creator.profile_picture}
                  alt="profile-image"
                  className="w-[36px] rounded-full"
                />
                <p>{vibes[0].creator.user_name}</p>
                {/* Todo: Make this button is visible if the user is on another user's profile */}
                <FollowButton />
              </div>
            )}

            <div className="flex flex-wrap mx-4">
              {vibes.length > 0 && <p>{vibes[0].content}</p>}
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
            <ThreeDotMenuViewOthers />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={play} alt="colombo" className="w-[1rem]"/> : <VibesViewIcon w={25} h={25} fill={"#ffffff"} />}  
              {/* const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' }); */}
              <p className="text-[10px]">121.5k</p>
            </div>
            <LikeVibe vibe={vibe} />
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
            {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={comment} alt="colombo" className="w-[1rem]"/> : <VibesCommentIcon w={25} h={25} fill={"#ffffff"} />}
              <p className="text-[10px]">121.5k</p>
            </div>
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
              {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={stats} alt="colombo" className="w-[1rem]"/> : <StatsIcon />}
              <p className="text-[10px]">120</p>
            </div>
            <div
              className="flex flex-col items-center gap-[2px] md:gap-1"
              onClick={() => handleShare()}
            >
              {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={share} alt="colombo" className="w-[1rem]"/> : <VibesShareIcon w={25} h={24} fill={"#ffffff"} />}
              <p className="text-[10px]">121.5k</p>
            </div>
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
              {/* <VibesCommentIcon w={30} h={30} fill={"#ffffff"} /> */}
              {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={wallet} alt="colombo" className="w-[1rem]"/> : <WalletIcon />}
              <p className="text-[10px]">$20</p>
            </div>
            {/* <div className="bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full"> */}
            {/* <GenAiIcon w={30} h={25} fill={"#ffffff"} /> */}
            <div className="flex flex-col items-center gap-[2px] md:gap-1">
            {useMediaQuery({ query: '(max-width: 767px)' }) ? <Image src={pen} alt="colombo" className="w-[2rem]"/> : <GenAIPen/>}
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