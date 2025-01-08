import React from "react";
import ProfilePicture from "../elements/ProfilePicture";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMessages } from "@/context/MessagesContext";

export default function ChatWindowHeader() {
  const { isShowChatMenu, setIsShowChatMenu, selectedChat, onlineUsers } = useMessages();

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          {/* <button
            className="hover:text-brandprimary xl:hidden"
            onClick={() => setIsShowChatMenu(!isShowChatMenu)}
          >
            <BsThreeDotsVertical />
          </button> */}
          <div className="relative flex-none">
            <ProfilePicture
              size={46}
              image={selectedChat?.profile_picture}
              className="h-12 w-12 rounded-full object-cover"
            />
            {onlineUsers?.includes(selectedChat?._id) && (
              <div className="absolute bottom-0 right-0">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
            )}
          </div>
          <div className="mx-3">
            <p className="font-semibold">{selectedChat?.name || "User"}</p>
            <p className="text-xs text-gray-500">@{selectedChat?.user_name || "username"}</p>
          </div>
        </div>
        {/* <ChatUserActionsDropdown /> */}
      </div>
      <div className="h-px w-full border-b border-white-light"></div>
    </div>
  );
}
