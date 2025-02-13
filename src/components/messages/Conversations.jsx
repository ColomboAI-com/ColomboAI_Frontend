import { useMessages } from "@/context/MessagesContext";
import { useContext, useEffect, useState } from "react";
import ProfilePicture from "../elements/ProfilePicture";
import { GlobalContext } from "@/context/GlobalContext";
import Loader from "../Loader";
import NoDataFound from "../NoDataFound";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "cookies-next";

export default function Conversations() {
  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const {
    conversations,
    setConversations,
    selectedChat,
    setSelectedChat,
    onlineUsers,
    loadings,
    DUMMY_TEXT,
    setCurrentConversation,
    updateCurrentConversation,
  } = useMessages();
  const { setIsUserProfileOpen } = useContext(GlobalContext);

  const handleSelectChat = (user, conversation) => {
    // console.log("user convo: " + JSON.stringify(user));
    // console.log("user conversation: " + JSON.stringify(conversation));
    setSelectedChat(user);
    updateCurrentConversation(conversation);
    setIsShowChatMenu(false);
    setIsUserProfileOpen(false);
  };

  useEffect(() => {
    console.log("IN CONVERSATION COMPONENT");
    console.log("CONVO LENGTH: " + conversations.length);
    console.log(conversations);
  }, [conversations]);

  return (
    <div
      className={`bg-white shadow absolute z-10 border-r-[1px] md:border-brandprimary border-transparent h-full w-full lg:max-w-xs flex-none space-y-4 overflow-hidden lg:relative block ${
        isShowChatMenu ? "!block" : ""
      }`}
    >
      <div className="Chat-list">
        <div className="chat-users border- border-purple-400 overflow-y-auto relative h-full min-h-[100px] max-h-[calc(100vh_-_190px)] md:max-h-[calc(100vh_-_145px)]">
          {loadings.conversations ? (
            <Loader className={"mt-5"} />
          ) : conversations?.length > 0 ? (
            conversations.map((conversation, index) => {
              let user = conversation?.participants?.[0];
              let userId = getCookie("userid");
              if (
                conversation?.participants &&
                conversation?.participants.length > 1
              ) {
                for (let p of conversation?.participants) {
                  if (p._id != userId) {
                    user = p;
                    break;
                  }
                }
              }
              if (conversation.participants.length === 2) {
                return (
                  <div key={index}>
                    <button
                      className={`flex w-full items-center border-b-[1px] justify-between p-2 hover:bg-gray-100 hover:text-brandprimary${
                        user?._id === selectedChat?._id
                          ? " bg-brandprimary/20 text-brandprimary"
                          : ""
                      }`}
                      onClick={() => handleSelectChat(user, conversation)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="relative flex-shrink-0">
                            <ProfilePicture
                              size={48}
                              image={user?.profile_picture}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            {onlineUsers?.includes(user?._id) && (
                              <div>
                                <div className="absolute bottom-0 right-0">
                                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mx-3 text-left">
                            <p className="mb-1 font-semibold">
                              {user?.name || user?.user_name || "User"}
                            </p>
                            <p className="max-w-[160px] truncate text-xs text-gray-500">
                              {conversation.lastMessage?.text
                                ? conversation.lastMessage?.text === DUMMY_TEXT
                                  ? ""
                                  : conversation.lastMessage?.text
                                : conversation.lastMessage?.img &&
                                  "Sent a photo"}
                            </p>
                          </div>
                          {/* <div className="mx-auto">
                            <div className="bg-[#eb5757] h-6 w-6 rounded-full text-white text-sm flex justify-center items-center">
                              9
                            </div>
                            <div className="text-xs mt-1 text-gray-500">2m</div>
                          </div> */}
                        </div>
                      </div>
                      {/* <div>
                    {user.pending > 0 && (
                      <div className=" bg-red-400 min-w-[25px] p-1 mb-1 rounded-full text-white text-xs font-semibold">
                        <p>{user.pending}</p>
                      </div>
                    )}
                    <div className="whitespace-nowrap text-gray-500 text-xs font-extralight">
                      <p>{user.time}</p>
                    </div>
                  </div> */}
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <NoDataFound className={"mt-5"} />
          )}
        </div>
      </div>
    </div>
  );
}
