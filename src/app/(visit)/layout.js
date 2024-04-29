"use client"
import Sidebar from "@/components/layouts/Sidebar"

import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../../components/Icons";

import Link from "next/link";
import { usePathname } from "next/navigation";


const DefaultLayout = ({ children }) => {
  
  const pathname = usePathname();

  const feedSections = [ '/feed','/video', '/vibes', '/thoughts','/images', '/explore', '/profile'];
  
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
            <div className="flex justify-center flex-1 border- border-purple-400">
              <div className="w-[100%] lg:w-[70%]">
                {children}
              </div>
          </div>
        </div>

        {/* Bottombar Mobile View */}
        <div className=" md:hidden bg-white sticky bottom-0 z-50 border-t-2 border-brandprimary rounded-xl">
            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
                <div className="py-4 flex flex-wrap items-center justify-evenly">
                <Link href="/gen-ai">
                    <div className="mx-4">
                        <div className="w-[29px] mx-auto">
                            <GenAiIcon w="30" h="30" fill={pathname === '/gen-ai' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/gen-ai' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Gen AI</p>
                    </div>
                </Link>

                <Link href="/task-bot">
                    <div className="mx-4">
                        <div className="w-[29px] mx-auto">
                            <TaskBotIcon w="30" h="30" fill={pathname === '/task-bot' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/task-bot' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Task bot</p>
                    </div>
                </Link>

                <Link href="/feed">
                    <div className="mx-4 ">
                        <div className="w-[29px] mx-auto">
                            <FeedIcon w="30" h="30" fill={feedSections.includes(`${pathname}`) ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${feedSections.includes(`${pathname}`) ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Feed</p>
                    </div>
                </Link>

                <Link href="/shop">
                    <div className="mx-4">
                        <div className="w-[29px] mx-auto">
                            <ShopIcon w="30" h="30" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Shop</p>
                    </div>
                </Link>

                <Link href="/news">
                    <div className="mx-4">
                        <div className="w-[29px] mx-auto">
                            <NewsIcon w="30" h="30" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>News</p>
                    </div>
                </Link>
                </div>
            </div>
        </div>


      </div>

  )
}

export default DefaultLayout
