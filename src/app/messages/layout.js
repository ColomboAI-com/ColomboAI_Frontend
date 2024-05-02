/* eslint-disable @next/next/no-img-element */
"use client"
import Sidebar from "@/components/layouts/Sidebar"
import Bottombar from "@/components/layouts/Bottombar";
import Modal from "@/components/elements/Modal";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import NewMessage from "@/components/messages/NewMessage";
import MessageHeader from "@/components/messages/MessageHeader";
import SelectPicture from "@/components/messages/SelectPicture";
import CreatePost from "@/components/elements/CreatePost";

const DefaultLayout = ({ children }) => {

  const { isNewMessageOpen, setIsNewMessageOpen, isSelectPictureMessageOpen, setIsSelectPictureMessageOpen, isCreatePostOpen, setIsCreatePostOpen } = useContext(GlobalContext);

  return (
      <div className="min-w-screen border- border-yellow-400">
        <header className="sticky top-0 z-50 shadow-[0px_2px_4px_0px_#0000001A] bg-white">
          <div className="border-2 border-purple-50">
            <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[183px]" />
          </div>
        </header>
        <div className="flex border- border-green-400">
          <div className="min-w-[10%] xl:min-w-[5%] h-[calc(100vh-56.28px)] sticky top-14 z-50 hidden md:block border-r-2 border-brandprimary">
            <Sidebar />
          </div>
          <div className="min-w-[100%] md:min-w-[90%] xl:min-w-[95%] flex flex-col relative ">
            <MessageHeader/>
            <div className="flex flex-1 justify-center border- border-purple-400">
              <div className="w-[100%] min-h-screena lg:w-[70%">
              {
                isNewMessageOpen &&
                <Modal isOpen={isNewMessageOpen} setIsOpen={setIsNewMessageOpen} className="w-full font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all">
                  <NewMessage/>
                </Modal>
              }
              {
                isSelectPictureMessageOpen &&
                <Modal isOpen={isSelectPictureMessageOpen} setIsOpen={setIsSelectPictureMessageOpen} className="w-full font-sans max-w-xl md:max-w-2xl lg:max-w-3xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <SelectPicture/>
                </Modal>
              }
              {
                isCreatePostOpen &&
                <Modal isOpen={isCreatePostOpen} setIsOpen={setIsCreatePostOpen} className="w-full max-w-4xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <CreatePost />
                </Modal>
              }
                {children}
              </div>
            </div>
          </div>
        </div>
        {/* Bottombar Mobile View */}
        <Bottombar/>
      </div>
  )
}

export default DefaultLayout
