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
import { ROOT_URL_MESSAGES } from "@/utlils/rootURL";
import { getCookie, getCookies } from "cookies-next";
import { useParams, useSearchParams } from "next/navigation";
// import { io } from "socket.io-client"

const ComponentsAppsChat = () => {
  const { selectedChat } = useMessages();
  const { isUserProfileOpen, setIsUserProfileOpen } = useContext(GlobalContext);
  const {
    setOnlineUsers,
    setDisconnectedUser,
    setNewMessage,
    setSelectedChat,
    createConversation,
  } = useMessages();

  const closeChat = () => {
    setIsUserProfileOpen(false);
    setSelectedChat(false);
  };

  // useEffect(() => {
  //   const connectSocket = io(`${ROOT_URL_MESSAGES}`, {
  //     auth: {
  //       token: getCookie('token')
  //     }
  //   })

  //   connectSocket.on('connect', () => {
  //     // console.log('Connected to socket.io server')
  //   })

  //   connectSocket.on('getOnlineUsers', (data) => {
  //     setOnlineUsers(data)
  //   })

  //   connectSocket.on('userDisconnected', (data) => {
  //     setDisconnectedUser(data)
  //   })

  //   connectSocket.on('newMessage', (data) => {
  //     setNewMessage(data)
  //   })

  //   return () => {
  //   connectSocket.disconnect()
  //   }
  // }, [])

  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (searchParams) {
  //     const userId = searchParams.get("user_id");
  //     const userName = searchParams.get("user_name");
  //     let data = {
  //       participants: [getCookie("userid"), userId],
  //       lastMessage: {
  //         img: "",
  //         seen: true,
  //         sender: getCookie("userid"),
  //         text: "DUMMY_TEXT",
  //       },
  //     };
  //     createConversation(data);
  //   }
  // }, [searchParams]);

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
