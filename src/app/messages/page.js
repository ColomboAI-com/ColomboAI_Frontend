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
          {/* Chat window or User Profile Section */}
          {selectedChat && !isUserProfileOpen ? (
            <div className="relative h-full">
              <ChatWindowHeader />

              {/* Message window */}
              <div className="chat-conversation-box border- border-red-400 relative h-full max-h-[calc(100vh_-_325px)] md:max-h-[calc(100vh_-_280px)] overflow-y-auto no-scrollbar">
                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                  {selectedChat.messages && selectedChat.messages.length ? (
                    <>
                      <div className="m-6 mt-0 block">
                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs">
                          <span className="relative top-2 bg-white px-3">
                            {"Today"}
                          </span>
                        </h4>
                      </div>
                      {selectedChat.messages.map((message, index) => {
                        return (
                          <div key={index}>
                            <div
                              className={`flex items-start gap-3 ${selectedChat.userId === message.fromUserId
                                ? "justify-end"
                                : ""
                                }`}
                            >
                              {/* Users image in conversation */}

                              {/* <div className={`flex-none ${selectedChat.userId === message.fromUserId ? 'order-2' : ''}`}>
                                    {selectedChat.userId === message.fromUserId ? (
                                        <img src={`/images/profile2/${loginUser.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                    ) : (
                                        ''
                                    )}
                                    {selectedChat.userId !== message.fromUserId ? (
                                        <img src={`/images/profile2/${selectedChat.path}`} className="h-10 w-10 rounded-full object-cover" alt="" />
                                    ) : (
                                        ''
                                    )}
                                  </div> */}

                              {/* Conversation Messages */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  {message.text && (
                                    <div
                                      className={`rounded-full bg-[#E3E3E3] p-4 py-2 ${message.fromUserId ===
                                        selectedChat.userId
                                        ? "!bg-brandprimary text-white rounded-tr-none"
                                        : "rounded-tl-none"
                                        }`}
                                    >
                                      {message.text}
                                    </div>
                                  )}
                                  {message.image && (
                                    <div
                                      className={`rounded-2xl bg-[#E3E3E3] p-2 py-2 w-[40%] ${message.fromUserId ===
                                        selectedChat.userId
                                        ? "!bg-brandprimary text-white rounded-tr-none"
                                        : "rounded-tl-none"
                                        }`}
                                    >
                                      <img
                                        src={`/images/${message.image}`}
                                        className=" aspect-video object-cover rounded-2xl"
                                        alt=""
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className=" flex justify-center items-center -m-4 min-h-[calc(100vh_-_325px)] md:min-h-[calc(100vh_-_280px)] text-[#D1D1D1] text-xl text-center ">
                      Kickstart your conversation with <br /> Magic Pen!
                    </div>
                  )}
                </div>
              </div>

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
