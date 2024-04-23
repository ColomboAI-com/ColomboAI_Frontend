/* eslint-disable @next/next/no-img-element */
// import Header from "@/components/layouts/Header"
// import RightSidebar from "@/components/layouts/RightSidebar"
// import Sidebar from "@/components/layouts/Sidebar"
// import FeedContextProvider from "@/context/FeedContext"

// const DefaultLayout = ({ children }) => {
//   return (
//     <FeedContextProvider>
//       <div className=" min-w-screen border-2 border-yellow-400">
//         <header className="shadow-[0px_2px_4px_0px_#0000001A]">
//           <div className=" border-2 border-purple-50">
//             <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[183px]" />
//           </div>
//         </header>
//         <div className="flex border-2 border-green-40 ">
//           <div className=" w-[10%] max-h-[93.5vh] hidden md:block border-2 border-brandprimary">
//             <Sidebar />
//           </div>
//           <div className=" max-w-[100%] md:max-w-[90%]">
//             <Header />
//             <div className="flex">
//               <div className="overflow-x-hidden lg:w-[70%] px-6 md:px-10 lg:px-20">
//                 {children}
//               </div>
//               <div className=" hidden lg:block lg:w-[30%] pt-10 px-2 shadow-[0px_2px_4px_0px_#0000001A]">
//                 <RightSidebar/>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </FeedContextProvider>
//   )
// }

// export default DefaultLayout
'use client'
import Header from "@/components/layouts/Header"
import InputBar from "@/components/layouts/InputBar";
import RightSidebar from "@/components/layouts/RightSidebar"
import Sidebar from "@/components/layouts/Sidebar"
import FeedContextProvider from "@/context/FeedContext"

import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../../components/Icons";

import Link from "next/link";
import { usePathname } from "next/navigation";


const navigation = [
  { name: "Feed", link: "/feed" },
  { name: "Video", link: "/feed/video" },
  { name: "Vibes", link: "/feed/vibes" },
  { name: "Thoughts", link: "/feed/thoughts" },
  { name: "Images", link: "/feed/images" },
  { name: "Explore", link: "/explore" },
  { name: "Profile", link: "/profile" },
];


const DefaultLayout = ({ children }) => {
  
  const pathname = usePathname();
  
  return (
    <FeedContextProvider>
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
          <div className="min-w-[100%] md:min-w-[90%] xl:min-w-[95%] flex flex-col">
            <Header />
            <div className="flex flex-1 border- border-purple-400">
              <div className="overflow-y-auto lg:w-[70%] min-h-[60vh] px-6 md:px-10 lg:px-20">
                {children}
              </div>
              <div className="hidden overflow-hidden lg:block lg:w-[30%] pt-10 px-2 shadow-[0px_2px_4px_0px_#0000001A]">
                <RightSidebar/>
              </div>
            </div>
          </div>
        </div>

        {/* Bottombar Mobile View */}
        <div className=" md:hidden bg-white sticky bottom-0 z-50 border-t-2 border-brandprimary rounded-xl">
            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
                <div className="py-4 flex flex-wrap items-center justify-evenly">
                  <div className="mx-4">
                      <div className="w-[29px] mx-auto">
                          <GenAiIcon w="30" h="30" fill={pathname === '/gen-ai' ? "#1E71F2" : "#8E8E93"} />
                      </div>
                      <p className={`${pathname === '/gen-ai' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Gen AI</p>
                  </div>
                  <div className="mx-4">
                      <div className="w-[29px] mx-auto">
                          <TaskBotIcon w="30" h="30" fill={pathname === '/task-bot' ? "#1E71F2" : "#8E8E93"} />
                      </div>
                      <p className={`${pathname === '/task-bot' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Task bot</p>
                  </div>
                  <div className="mx-4">
                      <div className="w-[29px] mx-auto">
                          <FeedIcon w="30" h="30" fill={pathname.includes('/feed') ? "#1E71F2" : "#8E8E93"} />
                      </div>
                      <p className={`${pathname.includes('/feed') ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Feed</p>
                  </div>
                  <div className="mx-4">
                      <div className="w-[29px] mx-auto">
                          <ShopIcon w="30" h="30" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                      </div>
                      <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Shop</p>
                  </div>
                  <div className="mx-4">
                      <div className="w-[29px] mx-auto">
                          <NewsIcon w="30" h="30" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                      </div>
                      <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>News</p>
                  </div>
                </div>
            </div>
        </div>


      </div>
    </FeedContextProvider>
  )
}

export default DefaultLayout
