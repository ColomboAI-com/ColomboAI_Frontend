"use client";
import FeedFilter from "@/components/layouts/FeedFilter";
import { GlobalContext } from "@/context/GlobalContext";
import UserProfileContextProvider from "@/context/UserProfileContext";
import { useContext } from "react";

const FeedLayout = ({ children }) => {
  const { isCommentOpen } = useContext(GlobalContext);

  return (
    <UserProfileContextProvider>
      <div className="border-green-500">
        <FeedFilter className="bg-white sticky  top-0 z-10 py-[14px] sm2:py-3 flex flex-wrap items-center justify-evenly border- px-6 lg:px-16 gap-6 shadow-[0px_2px_4px_0px_#0000001A]" />
        <div className="w-[100%] h-[calc(100vh-263px)] overflow-y-auto px-6 md:px-10 lg:px-20 " id="feed_section">
          {children}
        </div>
      </div>
    </UserProfileContextProvider>
  );
};

export default FeedLayout;
