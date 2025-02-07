/* eslint-disable @next/next/no-img-element */
"use client";
import Header from "@/components/layouts/Header";
import RightSidebar from "@/components/layouts/RightSidebar";
import SuggestedVibes from "@/components/layouts/SuggestedVibes";
import Sidebar from "@/components/layouts/Sidebar";
import FeedContextProvider from "@/context/FeedContext";
import Modal from "@/components/elements/Modal";
import CreatePost from "@/components/elements/CreatePost";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Share from "@/components/Share";
import CommentSection from "@/components/comment/CommentSection";
import Bottombar from "@/components/layouts/Bottombar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FeedIcon,
  GenAiIcon,
  NewsIcon,
  ShopIcon,
  TaskBotIcon,
} from "@/components/Icons";
import NotificationBar from "@/components/notifications/NotificationBar";
import { messaging } from "@/utlils/firebaseConfig";
import { getToken } from "firebase/messaging";
import vibes_icon from "../../../public/images/icons/sidebar/vibes_icon.svg";
// import { ROOT_URL_NOTIFICATION } from "@/utlils/rootURL"
import { handleError } from "@/utlils/handleError";
import axios from "axios";
import { getCookie } from "@/utlils/cookies";
import { MessageBox } from "@/components/MessageBox";
import CreateVibe from "@/components/elements/CreateVibe";
import CreateStory from "@/components/elements/CreateStory";
import Image from "next/image";
import genai_pen from "../../../public/images/icons/genai_pen.svg";
import { Montserrat } from "@next/font/google";
import blue_vibes_icon from "../../../public/images/icons/sidebar/blue_vibes_icon.svg";
import path from "path";
import { useMediaQuery } from "react-responsive";
import shop_blue from "../../../public/images/icons/main_menu_icons/shop_blue.svg";
import shop_grey from "../../../public/images/icons/main_menu_icons/shop_grey.svg";

const font = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

let myWindow = typeof window !== "undefined" ? window : null;

const DefaultLayout = ({ children }) => {
  const pathname = usePathname();

  const feedSections = [
    "/feed",
    "/video",
    "/vibes",
    "/thoughts",
    "/images",
    "/explore",
    "/profile",
  ];

  const {
    isShareOpen,
    setIsShareOpen,
    isCreatePostOpen,
    setIsCreatePostOpen,
    isCommentOpen,
    setIsCommentOpen,
    specificPostId,
    setSpecificPostId,
    posts,
    setPosts,
    isCreateVibeOpen,
    setIsCreateVibeOpen,
    isSelectedFromComputer,
    setIsSelectedFromComputer,
    storyMediaURL,
    storyMediaType,
  } = useContext(GlobalContext);

  useEffect(() => {
    console.log(storyMediaURL);
    console.log(storyMediaType);
  }, [storyMediaURL]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const defaultPostType = "thought";
  const [uploadedPostType, setUploadedPostType] = useState(defaultPostType);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");
  const [uploadedNextStep, setUploadedNextStep] = useState(false);
  const handleFileUpload = (file) => {
    setUploadedFile(file);
    const fileType = file.type.split("/")[0];
    setUploadedPostType(fileType);
    const fileUrl = URL.createObjectURL(file);
    setUploadedMediaUrl(fileUrl);
    setUploadedNextStep(true);
  };
  const handleReset = () => {
    setUploadedFile(null);
    setUploadedPostType(defaultPostType);
    setUploadedMediaUrl("");
    setUploadedNextStep(false);
    setIsSelectedFromComputer(false);
  };
  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const StoreFcmToken = async (token) => {
    try {
      const res = await axios.post(
        `${ROOT_URL_NOTIFICATION}/store_fcm_token`,
        { fcm_token: token },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      return res.data;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw error after handling
    }
  };

  async function requestPermission() {
    if (isShowChatMenu) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Generate Token
        const token = await getToken(messaging, {
          vapidKey:
            "BEOQAvPUbuQu2BqlLZWaURQL0T1KqitVlTyUXJ-fRfxkVPkuYKgxnz7927ycs2L2-O1az1MyA1Tv6ZEkD2Nimlo",
        });
        console.log("Token Gen", token);
        try {
          const res = await StoreFcmToken(token); // Await StoreFcmToken function call
          // Send this token  to server ( db)
        } catch (error) {
          // Handle error if any
          console.error("Error while storing FCM token:", error);
        }
      } else if (permission === "denied") {
        MessageBox("error", "You denied for the notification");
      }
    }
  }

  useEffect(() => {
    // Request user for notification permission
    requestPermission();
  }, [isShowChatMenu]);

  // useEffect(() => {
  //   const re = window.sessionStorage.getItem("redirect");

  //   if (!re) {
  //     window.sessionStorage.setItem("redirect", "false");
  //     window.location = "https://colomboai.com/genai-search";
  //   }

  // },[]);
  const [isSmallScreen, setIsSmallScreen] = useState(
    myWindow ? myWindow?.innerWidth <= 768 : null
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FeedContextProvider>
      <div
        className={`min-w-screen border-yellow-400 md:relative  ${font.className}`}
      >
        <div className="flex lg:max-h-[87vh] border-green-400 xl:h-screen">
          <div className="lg:min-w-[4%]  xl:min-w-[5%] max-h-[calc(100vh-0px)] bg-white fixed h-screen  z-[100] hidden md:block border-r-[1px] border-brandprimary ">
            <Sidebar />
          </div>
          <div className="min-w-[100%] md:min-w-[90%] lg:min-w-[96%] xl:min-w-[95%] xl:ml-[5%] lg:ml-[5%] md:ml-[5%] flex flex-col relative sm:ml-[0]">
            <header
              className={`${
                pathname === "/vibes" && `sm:hidden md:block`
              } sticky top-0 z-[50] xl:border-b-[1px] lg:border-b-[1px] border-[#E3E3E3] bg-white sm:border-0`}
            >
              <div className="sm:pt-[14px] md:py-[14px] bg-white">
                {/* {isSmallScreen ? (
                  <Header
                    setIsShowChatMenu={setIsShowChatMenu}
                    isShowChatMenu={isShowChatMenu}
                  />
                ) : (
                  <img
                    src="/images/home/ColomboAI-logo.svg"
                    alt="logo-image"
                    className="mx-auto w-[174px] lg:opacity-100 opacity-0"
                  />
                )} */}
                <div className="block md:hidden">
                  <Header
                    setIsShowChatMenu={setIsShowChatMenu}
                    isShowChatMenu={isShowChatMenu}
                  />
                </div>
                <img
                  src="/images/home/ColomboAI-logo.svg"
                  alt="logo-image"
                  className="mx-auto w-[174px] hidden md:block"
                />
              </div>
            </header>
            {/* {isSmallScreen === false && ( */}
            <div className="hidden md:block">
              <Header
                setIsShowChatMenu={setIsShowChatMenu}
                isShowChatMenu={isShowChatMenu}
              />
            </div>
            {/* )} */}

            {!isSelectedFromComputer && (
              <div className="flex xl:flex-row sm:flex-col sm:items-center border-purple-400">
                {isCreatePostOpen && (
                  <Modal
                    isOpen={isCreatePostOpen}
                    setIsOpen={setIsCreatePostOpen}
                    className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
                  >
                    <CreatePost />
                  </Modal>
                )}
                {isCreateVibeOpen && (
                  <Modal
                    isOpen={isCreateVibeOpen}
                    setIsOpen={setIsCreateVibeOpen}
                    className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
                  >
                    <CreateVibe
                      uploadedFile={uploadedFile}
                      onFileUpload={handleFileUpload}
                      uploadedPostType={uploadedPostType}
                      uploadedMediaUrl={uploadedMediaUrl}
                      uploadedNextStep={uploadedNextStep}
                      onReset={handleReset}
                    />
                  </Modal>
                )}
                {isShareOpen && (
                  <Modal
                    isOpen={isShareOpen}
                    setIsOpen={setIsShareOpen}
                    className="w-full absolute bottom-0 sm2:w-auto md:w-auto sm2:relative md:relative max-w-4xl transform overflow-hidden align-middle shadow-xl transition-all"
                  >
                    <Share specificPostId={specificPostId} posts={posts} />
                  </Modal>
                )}
                {isCommentOpen && (
                  <Modal
                    isOpen={isCommentOpen}
                    setIsOpen={setIsCommentOpen}
                    className="mx-[150px]"
                  >
                    <CommentSection
                      setIsCommentOpen={setIsCommentOpen}
                      specificPostId={specificPostId}
                      posts={posts}
                    />
                  </Modal>
                )}
                {isShowChatMenu && (
                  <div className="border overflow-y-auto no-scrollbar relative h-full min-h-[100px] mx-2 max-h-[calc(100vh_-_190px)] md:max-h-[calc(100vh_-_145px)]">
                    <NotificationBar />
                  </div>
                )}

                <div
                  id="scroll-section"
                  className={`w-[100%] lg:w-[100%] ${
                    pathname === "/vibes"
                      ? ` sm:max-h-full sm:h-full`
                      : `sm:max-h-[calc((100vh-175px))]`
                  } nsm:max-h-[calc((100vh-175px))] ${
                    pathname === "/explore" && `md:h-full overflow-y-visible`
                  } ${pathname === "/vibes" && `md:max-h-[calc(100vh-0px)]`} ${
                    (pathname !== "vibes" || pathname !== "/explore") &&
                    `md:max-h-[calc(100vh-192.28px)]`
                  } hide-scrollbar no-scrollbar overflow-y-auto self-start`}
                >
                  {children}
                </div>
                {pathname === "/shop" || pathname === "/news" ? null : (
                  <div
                    className={`${
                      (pathname === `/vibes` ||
                        pathname === "/feed" ||
                        pathname === "/videos" ||
                        pathname === "/thoughts" ||
                        pathname === "/explore") &&
                      "sm:hidden lg:hidden xl:block"
                    } lg:max-h-[calc(100vh-192.28px)] overflow-y-auto no-scrollbar self-start sm:w-[100%] lg:w-[100%] xl:w-[30%] pt-[13px] px-2 shadow-[-11px_-9px_2px_-10px_#00000033] relative lg:ml-[1px]`}
                  >
                    <RightSidebar />
                  </div>
                )}
              </div>
            )}
            {isCreateVibeOpen && isSelectedFromComputer && (
              <div className="bg-[#e0d5d5] w-full h-50">
                <CreateVibe
                  uploadedFile={uploadedFile}
                  onFileUpload={handleFileUpload}
                  uploadedPostType={uploadedPostType}
                  uploadedMediaUrl={uploadedMediaUrl}
                  uploadedNextStep={uploadedNextStep}
                  onReset={handleReset}
                />
              </div>
            )}
            {storyMediaURL != "" && isSelectedFromComputer && (
              <div className="bg-[#333333] w-full h-full">
                <CreateStory />
              </div>
            )}
            {/* <CommentSection /> */}
          </div>
        </div>

        {/* Bottombar Mobile View */}
        {pathname !== "/vibes" && (
          <div
            className={`md:hidden bg-white fixed bottom-0 z-50 w-full border-t-2 border-brandprimary rounded-xl`}
          >
            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
              <div className="py-1 flex flex-wrap items-center justify-evenly">
                <Link href="/genai-search">
                  <div className="mx-4">
                    <div className="w-[29px] mx-auto">
                      {/* <GenAiIcon
                      w="30"
                      h="30"
                      fill={pathname === "/gen-ai-icon" ? "#1E71F2" : "#8E8E93"}
                    /> */}
                      <Image src={genai_pen} alt="colombo" />
                    </div>
                    <p
                      className={`${
                        pathname === "/genai-search"
                          ? "text-brandprimary"
                          : "text-sidebaricon"
                      } text-center text-[14px] mt-2`}
                    >
                      Gen AI
                    </p>
                  </div>
                </Link>

                <Link href="/vibes">
                  <div className="mx-4">
                    <div className="w-[29px] mx-auto">
                      {pathname === "/vibes" ? (
                        <Image src={blue_vibes_icon} alt="colombo" />
                      ) : (
                        <Image src={vibes_icon} alt="colombo" />
                      )}
                    </div>
                    <p
                      className={`${
                        pathname === "/vibes"
                          ? "text-brandprimary"
                          : "text-sidebaricon"
                      } text-center text-[14px] mt-2`}
                    >
                      Vibes
                    </p>
                  </div>
                </Link>

                <Link href="/feed">
                  <div className="mx-4 ">
                    <div className="w-[29px] mx-auto">
                      <FeedIcon
                        w="30"
                        h="30"
                        fill={
                          feedSections.includes(`${pathname}`)
                            ? "#1E71F2"
                            : "#8E8E93"
                        }
                      />
                    </div>
                    <p
                      className={`${
                        feedSections.includes(`${pathname}`)
                          ? "text-brandprimary"
                          : "text-sidebaricon"
                      } text-center text-[14px] mt-2`}
                    >
                      Feed
                    </p>
                  </div>
                </Link>

                <Link href="/shop">
                  <div className="mx-4">
                    <div className="w-[29px] mx-auto">
                      <Image
                        src={pathname === "/shop" ? shop_blue : shop_grey}
                        alt="colombo"
                      />
                      {/* <ShopIcon
                      w="30"
                      h="30"
                      fill={pathname === "/shop" ? "#1E71F2" : "#8E8E93"}
                    /> */}
                    </div>
                    <p
                      className={`${
                        pathname === "/shop"
                          ? "text-brandprimary"
                          : "text-sidebaricon"
                      } text-center text-[14px] mt-2`}
                    >
                      Shop
                    </p>
                  </div>
                </Link>

                <Link href="/news">
                  <div className="mx-4">
                    <div className="w-[29px] mx-auto">
                      <NewsIcon
                        w="30"
                        h="30"
                        fill={pathname === "/news" ? "#1E71F2" : "#8E8E93"}
                      />
                    </div>
                    <p
                      className={`${
                        pathname === "/news"
                          ? "text-brandprimary"
                          : "text-sidebaricon"
                      } text-center text-[14px] mt-2`}
                    >
                      News
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Bottombar Mobile View */}
      {/* <Bottombar /> */}
    </FeedContextProvider>
  );
};

export default DefaultLayout;
