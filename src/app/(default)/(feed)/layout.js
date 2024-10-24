"use client";
import Feed from "@/app/(default)/(feed)/feed/page";
import FeedFilter from "@/components/layouts/FeedFilter";
import { GlobalContext } from "@/context/GlobalContext";
import UserProfileContextProvider from "@/context/UserProfileContext";
import { useContext } from "react";
import { usePathname } from "next/navigation";


const FeedLayout = ({ children }) => {
  const { isCommentOpen } = useContext(GlobalContext);
  const pathname = usePathname();


  return (
    <UserProfileContextProvider>
      <div className="w-full mx-auto bg-white">
        <div className="sticky top-0 z-10 w-full bg-white shadow-md">
          <FeedFilter className="w-full sm:pb-[6px] sm:pt-[8px] lg:pb-[14px] lg:pt-[14px] flex flex-wrap items-center justify-evenly xl:px-6 lg:px-0 lg:gap-8 xl:gap-6 shadow-[0px_2px_4px_0px_#0000001A]" />
        </div>
        <div className={`w-full overflow-x-clip overflow-y-auto ${pathname === `/vibes` ? `md:px-0` : `md:px-10`} lg:px-0 ${pathname !== '/vibes' && `xl:px-20`}`} id="feed_section">
          {children}
        </div>
      </div>
    </UserProfileContextProvider>
  );
};

export default FeedLayout;
