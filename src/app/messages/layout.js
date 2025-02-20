/* eslint-disable @next/next/no-img-element */
"use client";
import Sidebar from "@/components/layouts/Sidebar";
import Bottombar from "@/components/layouts/Bottombar";
import Modal from "@/components/elements/Modal";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import SearchUsersList from "@/components/messages/SearchUsersList";
import MessageHeader from "@/components/messages/MessageHeader";
import SelectPicture from "@/components/messages/SelectPicture";
import CreatePost from "@/components/elements/CreatePost";
import { MessagesContextProvider } from "@/context/MessagesContext";
import UserProfileContextProvider from "@/context/UserProfileContext";
import SearchUsersListGeneral from "@/components/messages/SearchUsersListGeneral";
import SearchConversation from "@/components/messages/SearchConversation";

const DefaultLayout = ({ children }) => {
  const {
    isNewMessageOpen,
    setIsNewMessageOpen,
    isCreatePostOpen,
    setIsCreatePostOpen,
    isSearchUserOpen,
    setIsSearchUserOpen,
    isSearchConversationOpen,
    setIsSearchConversationOpen,
  } = useContext(GlobalContext);
  return (
    <MessagesContextProvider>
      <UserProfileContextProvider>
        <div className="min-w-screen border- border-yellow-400">
          <div className="flex border- border-green-400">
            <div className="min-w-[10%] xl:min-w-[5%] h-[calc(100vh)] sticky z-50 hidden md:block border-r-[1px] border-brandprimary">
              <Sidebar />
            </div>
            <div className="w-full flex flex-col relative">
              <header className="sticky top-0 z-50 bg-white sm:border-0">
                <div className="py-[14px]">
                  <img
                    src="/images/home/ColomboAI-logo.svg"
                    alt="logo-image"
                    className="mx-auto w-[174px] h-[50px]"
                  />
                </div>
              </header>
              <MessageHeader />
              <div className="flex flex-1 justify-center border- border-purple-400">
                <div className="w-[100%] min-h-screena lg:w-[100%]">
                  {isNewMessageOpen && (
                    <Modal
                      isOpen={isNewMessageOpen}
                      setIsOpen={setIsNewMessageOpen}
                      className="w-full font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
                    >
                      <SearchUsersList />
                    </Modal>
                  )}
                  {isCreatePostOpen && (
                    <Modal
                      isOpen={isCreatePostOpen}
                      setIsOpen={setIsCreatePostOpen}
                      className="w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
                    >
                      <CreatePost />
                    </Modal>
                  )}
                  {isSearchConversationOpen && (
                    <Modal
                      isOpen={isSearchConversationOpen}
                      setIsOpen={setIsSearchConversationOpen}
                      className="w-full max-w-2xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
                    >
                      <SearchConversation setIsOpen={setIsSearchConversationOpen} />
                    </Modal>
                  )}
                  {children}
                </div>
              </div>
            </div>
          </div>
          {/* Bottombar Mobile View */}
          {/* <Bottombar /> */}
        </div>
      </UserProfileContextProvider>
    </MessagesContextProvider>
  );
};

export default DefaultLayout;
