"use client";
import Feed from "@/app/(default)/(feed)/feed/page";
import FeedFilter from "@/components/layouts/FeedFilter";
import { GlobalContext } from "@/context/GlobalContext";
import UserProfileContextProvider from "@/context/UserProfileContext";
import { useContext } from "react";

const FeedLayout = ({ children }) => {
  const { isCommentOpen } = useContext(GlobalContext);

  return (
    <UserProfileContextProvider>
      {/* <div className="border-green-500 flex flex-row justify-center"> */}
        {/* <p className="mt-[1.25rem]">Coming Soon</p> */}
        <FeedFilter className="bg-white sticky top-0 z-10 sm:pb-[6px] sm:pt-[8px] lg:pb-[14px] lg:pt-[14px] sm2:py-3 flex flex-wrap items-center justify-evenly xl:px-6 lg:px-0 lg:gap-8 xl:gap-6 shadow-[0px_2px_4px_0px_#0000001A]" />
      
        <div className="w-[100%] overflow-y-auto md:px-10 lg:px-0 xl:px-20 " id="feed_section">
          {children}
        </div>
      {/* </div> */}
    </UserProfileContextProvider>
  );
};

export default FeedLayout;