"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { useMessages } from "@/context/MessagesContext";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const page = () => {
  let {
    conversations,
    setSelectedChat,
    setIsShowChatMenu,
    updateCurrentConversation,
    createConversation,
    DUMMY_TEXT,
  } = useMessages();
  const { setIsUserProfileOpen, setIsNewMessageOpen } = useContext(GlobalContext);

  const router = useRouter();

  const handleCreateConversation = (user) => {
    let data = {
      participants: [getCookie("userid"), user._id],
      lastMessage: {
        img: "",
        seen: true,
        sender: getCookie("userid"),
        text: DUMMY_TEXT,
      },
    };
    createConversation(data);
    setIsNewMessageOpen(false);
  };

  const checkUserDataAndSetConversation = async () => {
    if (conversations.length > 0) {
      const userToMessage = await JSON.parse(localStorage.getItem("userToMessage"));

      for (const conversation of conversations) {
        if (conversation.participants.length === 2) {
          for (const participant of conversation.participants) {
            if (participant._id === userToMessage._id) {
              setSelectedChat(userToMessage);
              updateCurrentConversation(conversation);
              setIsShowChatMenu(false);
              setIsUserProfileOpen(false);
              router.push("/messages");
              return;
            }
          }
        }
      }

      handleCreateConversation(userToMessage);
    }
  };

  useEffect(() => {
    checkUserDataAndSetConversation();
  }, [conversations]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500 mt-2">Please wait while we fetch your data.</p>
      </div>
    </div>
  );
};

export default page;
