'use client'
import { usePathname } from "next/navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../Icons";

/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
    const a = false

    const pathname = usePathname();

    return (
        <div className="w-24 h-[92.5vh] border-r-2 border-brandprimary">
            <div className="mb-[46px] mt-[20px]">
            <img src="/images/home/profile-img.png" alt="profile-image" className="w-[58px] mx-auto" />
            </div>
            <div className="mb-12">
                <div className="w-[29px] mx-auto">
                    <GenAiIcon w="30" h="30" fill={pathname === '/gen-ai' ?"#1E71F2" : "#8E8E93"}/>
                </div>
                <p className={`${pathname === '/gen-ai' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Gen AI</p>
            </div>
            <div className="mb-12">
                <div className="w-[29px] mx-auto">
                    <TaskBotIcon w="30" h="30" fill={pathname === '/task-bot' ?"#1E71F2" : "#8E8E93"}/>
                </div>
                <p className={`${pathname === '/task-bot' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Task bot</p>
            </div>
            <div className="mb-12 ">
                <div className="w-[29px] mx-auto">
                    <FeedIcon w="30" h="30" fill={pathname === '/feed' ?"#1E71F2" : "#8E8E93"}/>
                </div>
                <p className={`${pathname === '/feed' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Feed</p>
            </div>
            <div className="mb-12">
                <div className="w-[29px] mx-auto">
                    <ShopIcon w="30" h="30" fill={pathname === '/shop' ?"#1E71F2" : "#8E8E93"}/>
                </div>
                <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Shop</p>
            </div>
            <div>
                <div className="w-[29px] mx-auto">
                    <NewsIcon w="30" h="30" fill={pathname === '/news' ?"#1E71F2" : "#8E8E93"}/>
                </div>
                <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>News</p>
            </div>
        </div>
    );
}

export default Sidebar;