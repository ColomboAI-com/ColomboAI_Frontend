'use client'
import FeedFilter from "@/components/layouts/FeedFilter"

const FeedLayout = ({ children }) => {

  return (
    <div className="border-green-500">
      <FeedFilter className="bg-white sticky top-0 z-50 sm2:py-3 flex flex-wrap items-center justify-evenly border- px-6 lg:px-16 gap-2 shadow-[0px_2px_0px_0px_#0000001A]" />
      <div className="w-[100%] h-[calc(100vh-222px)] overflow-y-auto px-6 md:px-10 lg:px-20" id="feed_section">
        {children}
      </div>
    </div>
  )
}

export default FeedLayout