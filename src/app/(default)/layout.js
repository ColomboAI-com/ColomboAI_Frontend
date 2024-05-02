"use client";
import Header from "@/components/layouts/Header";
import RightSidebar from "@/components/layouts/RightSidebar";
import Sidebar from "@/components/layouts/Sidebar";
import FeedContextProvider from "@/context/FeedContext";
import Modal from "@/components/elements/Modal";
import CreatePost from "@/components/elements/CreatePost";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Share from "@/components/Share";
import CommentSection from "@/components/comment/CommentSection";
import Bottombar from "@/components/layouts/Bottombar";

const DefaultLayout = ({ children }) => {
  const {
    isShareOpen,
    setIsShareOpen,
    isCreatePostOpen,
    setIsCreatePostOpen,
    isCommentOpen,
  } = useContext(GlobalContext);

  return (
    <div className="min-w-screen border- border-yellow-400 relative">
      <header className="sticky top-0 z-50 shadow-[0px_2px_4px_0px_#0000001A] bg-white">
        <div className="border-2 border-purple-50">
          <img
            src="/images/home/ColomboAI-logo.svg"
            alt="logo-image"
            className="mx-auto w-[183px]"
          />
        </div>
      </header>
      <div className="flex max-h-[100vh] border- border-green-400">
        <div className="min-w-[10%] xl:min-w-[5%] max-h-[calc(100vh-56.28px)] sticky top-14 z-50 hidden md:block border-r-2 border-brandprimary">
          <Sidebar />
        </div>
        <div className="min-w-[100%] md:min-w-[90%] xl:min-w-[95%] flex flex-col relative ">
          <Header />
          <div className="flex flex-1 border- border-purple-400">
            {isCreatePostOpen && (
              <Modal
                isOpen={isCreatePostOpen}
                setIsOpen={setIsCreatePostOpen}
                className="w-full max-w-4xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <CreatePost />
              </Modal>
            )}
            {isShareOpen && (
              <Modal
                isOpen={isShareOpen}
                setIsOpen={setIsShareOpen}
                className="w-full absolute bottom-0 md:w-auto md:w-auto md:relative md:relative max-w-4xl transform overflow-hidden align-middle shadow-xl transition-all"
              >
                <Share />
              </Modal>
            )}
            {isCommentOpen ? (
              <CommentSection />
            ) : (
              <>
                <div
                  className={
                    "w-[100%] lg:w-[70%] max-h-[calc((100vh-192.28px)-155px)] md:max-h-[calc(100vh-192.28px)] overflow-y-auto no-scrollbar "
                  }
                >
                  {children}
                </div>
                <div className="hidden lg:max-h-[calc(100vh-192.28px)] overflow-y-auto no-scrollbar lg:block lg:w-[30%] pt-10 px-2 shadow-[0px_2px_4px_0px_#0000001A]">
                  <RightSidebar />
                </div>
              </>
            )}
          </div>
          {/* <CommentSection /> */}
        </div>
      </div>
      {/* Bottombar Mobile View */}
      <Bottombar />
    </div>
  );
};

export default DefaultLayout;
