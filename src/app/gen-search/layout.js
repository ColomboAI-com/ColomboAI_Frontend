"use client"
import Sidebar from "@/components/layouts/Sidebar"
import Navigation from "@/components/profile/Navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../../components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBar from "@/components/notifications/NotificationBar";
import Bottombar from "@/components/layouts/Bottombar";

const GenSearch = ({ children }) => {
  return (
    <div className="min-w-screen border- border-yellow-400">
      <header className="sticky top-0 z-50 shadow-[0px_2px_4px_0px_#0000001A] bg-white">
        <div className="border-2 border-purple-50">
          <img src="/images/home/ColomboAI-logo.svg" alt="logo-image" className="mx-auto w-[183px]" />
        </div>
      </header>
      <div className="flex border- border-green-400">
        <div className="min-w-[10%] xl:min-w-[5%] h-[calc(100vhs-56.28px)] sticky top-14 z-50 hidden md:block border-r-2 border-brandprimary">
          <Sidebar />
        </div>
      </div>
      <Bottombar />
    </div>
  )
}

export default GenSearch
