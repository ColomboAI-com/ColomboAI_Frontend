"use client";
import React, { useContext, useState } from "react";
import {
  CamerIcon,
  EmojiIcon,
  GenAiIcon,
  ImageIcon,
  MicIcon,
} from "../../components/Icons";
import { GlobalContext } from "@/context/GlobalContext";
import UserProfileSection from "@/components/messages/UserProfileSection";
import Conversations from "@/components/messages/Conversations";
import BlankChatWindow from "@/components/messages/BlankChatWindow";
import { useMessages } from "@/context/MessagesContext";
import ChatWindowHeader from "@/components/messages/ChatWindowHeader";
import ChatHistory from "@/components/messages/ChatHistory";

const ComponentsAppsChat = () => {

  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const { selectedChat } = useMessages()
  const { isUserProfileOpen, setIsUserProfileOpen, setIsSelectPictureMessageOpen } = useContext(GlobalContext);

  return (
    <div className="font-sans">
      <div className={`relative flex h-[calc(100vh_-_155px)] md:h-[calc(100vh_-_140px)] sm:min-h-0 max-h-[calc(100vh_-_240px)] md:max-h-[calc(100vh_-_140px)] ${isShowChatMenu ? "min-h-[999px]" : ""}`}>
        <Conversations />
        <div
          className={`absolute z-[5] hidden h-full w-full bg-black/60 ${isShowChatMenu ? "!block xl:!hidden" : ""}`}
          onClick={() => setIsShowChatMenu(!isShowChatMenu)}
        ></div>

        <div className="Chat-window bg-white shadow flex-1 p-0">
          {!selectedChat && <BlankChatWindow />}
          {selectedChat && !isUserProfileOpen ? (
            <div className="relative h-full">
              <ChatWindowHeader />

              {/* Message window */}
              <ChatHistory />

              {/* Message Input */}
              <div className="absolut bottom-0 left-0 w-full px-4 pt-4">
                <div className="w-full items-center space-x-3 sm:flex">
                  <div className="relative flex-1">
                    <input
                      className="w-full text-sm font-semibold text-black !outline-none border-[1px] border-brandprimary focus:ring-transparent rounded-full px-12 py-2 focus:outline-none"
                      placeholder="Type a message"

                    />
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary left-4">
                      <EmojiIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-32">
                      <CamerIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-24">
                      <MicIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button
                      className="absolute top-1/2 -translate-y-1/2 text-brandprimary right-16"
                      onClick={() => setIsSelectPictureMessageOpen(true)}
                    >
                      <ImageIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                    <button className="absolute top-1/2 -translate-y-1/2 text-white right-0 bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] py-[8px] px-[10px] pr-[15px] rounded-r-full">
                      <GenAiIcon w={20} h={20} fill={"currentcolor"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : setIsUserProfileOpen ? (
            <UserProfileSection data={selectedChat} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsChat;
