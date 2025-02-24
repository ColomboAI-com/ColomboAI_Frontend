"use client";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import UserProfileSection from "@/components/messages/UserProfileSection";
import Conversations from "@/components/messages/Conversations";
import BlankChatWindow from "@/components/messages/BlankChatWindow";
import { useMessages } from "@/context/MessagesContext";
import ChatWindowHeader from "@/components/messages/ChatWindowHeader";
import ChatHistory from "@/components/messages/ChatHistory";
import MessageInput from "@/components/messages/MessageInput";

const ComponentsAppsChat = () => {
  const { selectedChat } = useMessages();
  const { isUserProfileOpen, setIsUserProfileOpen } = useContext(GlobalContext);
  const { setSelectedChat } = useMessages();

  const closeChat = () => {
    setIsUserProfileOpen(false);
    setSelectedChat(false);
  };

  return (
    <div className="font-sans">
      <div className="relative overflow-x-hidden flex h-[calc(100vh_-_155px)] md:h-[calc(100vh_-_140px)] sm:min-h-0 max-h-[calc(100vh_-_240px)] md:max-h-[calc(100vh_-_140px)]">
        <Conversations />
        {selectedChat && !isUserProfileOpen ? (
          <div className="Chat-window bg-white shadow flex-1 p-0 lg:relative absolute w-[100%] h-[100%] lg:z-[1] z-[11]">
            <div className="relative h-full">
              <ChatWindowHeader closeChat={closeChat} />
              <ChatHistory />
              <MessageInput />
            </div>
          </div>
        ) : (
          <div className="Chat-window bg-white shadow flex-1 p-0 lg:relative absolute w-[100%] lg:z-[1] z-[11] lg:block hidden">
            {selectedChat && !isUserProfileOpen ? null : isUserProfileOpen ? (
              <UserProfileSection data={selectedChat} />
            ) : (
              <BlankChatWindow />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentsAppsChat;
