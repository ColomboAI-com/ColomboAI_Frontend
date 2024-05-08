import { useMessages } from "@/context/MessagesContext";
import { useContext, useEffect, useState } from "react";
import ProfilePicture from "../elements/ProfilePicture";
import { GlobalContext } from "@/context/GlobalContext";
import Loader from "../Loader";
import NoDataFound from "../NoDataFound";

export default function Conversations() {

  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const { getConversations, conversations, setConversations, selectedChat, setSelectedChat, onlineUsers, loadings } = useMessages()
  const { setIsUserProfileOpen } = useContext(GlobalContext)

  useEffect(() => {
    getConversations()
  }, [])

  const handleSelectChat = (user) => {
    setSelectedChat(user)
    setIsShowChatMenu(false);
    setIsUserProfileOpen(false);
  }

  return (
    <div className={`bg-white shadow absolute z-10 border-r-[1px] border-brandprimary hidden h-full w-full max-w-xs flex-none space-y-4 overflow-hidden lg:relative lg:block ${isShowChatMenu ? "!block" : ""}`}>
      <div className="Chat-list">
        <div className="chat-users border- border-purple-400 overflow-y-auto no-scrollbar relative h-full min-h-[100px] max-h-[calc(100vh_-_190px)] md:max-h-[calc(100vh_-_145px)]">
          {
            loadings.conversations ? <Loader className={'mt-5'} /> :
              !conversations?.length ?
                conversations.map((i, index) => {
                  let user = i?.participants?.[0]
                  return (
                    <div key={index}>
                      <button
                        className={`flex w-full items-center border-b-2 justify-between p-2 hover:bg-gray-100 hover:text-brandprimary${user?._id === selectedChat?._id ? " bg-brandprimary/20 text-brandprimary" : ""}`}
                        onClick={() => handleSelectChat(user)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="relative flex-shrink-0">
                              <ProfilePicture size={48} image={user?.profile_picture} />
                              {onlineUsers?.includes(user?._id) && (
                                <div>
                                  <div className="absolute bottom-0 right-0">
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="mx-3 text-left">
                              <p className="mb-1 font-semibold">{user?.name || user?.user_name || 'User'}</p>
                              <p className="max-w-[160px] truncate text-xs text-gray-500">
                                {i.lastMessage?.text || i.lastMessage?.img && 'Sent a photo'}
                              </p>
                            </div>
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
                })
                : <NoDataFound className={'mt-5'} />
          }
        </div>
      </div>
    </div>
  )
}
