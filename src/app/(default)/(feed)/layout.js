'use client'
import CommentSection from "@/components/comment/CommentSection"
import FeedFilter from "@/components/layouts/FeedFilter"
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

const FeedLayout = ({ children }) => {

    const { isCommentOpen } = useContext(GlobalContext);

    //console.log(isCommentOpen);

  return (
    <div className="border-green-500">
      <FeedFilter className="bg-white sticky top-0 z-10 sm2:py-3 flex flex-wrap items-center justify-evenly border- px-6 lg:px-16 gap-2 shadow-[0px_2px_0px_0px_#0000001A]" />
      <div className="w-[100%] h-[calc(100vh-222px) overflow-y-auto px-6 md:px-10 lg:px-20 " id="feed_section">
        {/* {
            isCommentOpen
            ?
            <CommentSection/> 
            :
            <>
                {children}
            </>
        } */}
        {children}
      </div>
    </div>
  )
}

export default FeedLayout