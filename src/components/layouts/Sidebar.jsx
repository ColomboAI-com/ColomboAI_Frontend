'use client'
import { usePathname } from "next/navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon } from "../Icons";
import InputBar from "./InputBar";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
    const a = false

    const pathname = usePathname();

    const sideNavigation = [
        { name: "Feed", link: "/feed" },
        { name: "Explore", link: "/explore" },
        { name: "Profile", link: "/profile" },
    ];

    return (
        <>
            {/* Desktop View */}
            <div className="w-[100%]">
                <div className="mb-[46px] mt-[20px]">
                    <img src="/images/home/profile-img.png" alt="profile-image" className="w-[58px] mx-auto" />
                </div>

                <Link href="/gen-ai">
                    <div className="mb-12">
                        <div className="w-[29px] mx-auto">
                            <GenAiIcon w="30" h="30" fill={pathname === '/gen-ai' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/gen-ai' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Gen AI</p>
                    </div>
                </Link>

                <Link href="/task-bot">
                    <div className="mb-12">
                        <div className="w-[29px] mx-auto">
                            <TaskBotIcon w="30" h="30" fill={pathname === '/task-bot' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/task-bot' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Task bot</p>
                    </div>
                </Link>

                <Link href="/feed">
                    <div className="mb-12 ">
                        <div className="w-[29px] mx-auto">
                            <FeedIcon w="30" h="30" fill={pathname.includes('/feed') ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname.includes('/feed') ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Feed</p>
                    </div>
                </Link>

                <Link href="/shop">
                    <div className="mb-12">
                        <div className="w-[29px] mx-auto">
                            <ShopIcon w="30" h="30" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>Shop</p>
                    </div>
                </Link>

                <Link href="/news">
                    <div className="mb-12">
                        <div className="w-[29px] mx-auto">
                            <NewsIcon w="30" h="30" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-3 font-sans`}>News</p>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Sidebar;