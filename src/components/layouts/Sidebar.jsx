'use client'
import { usePathname } from "next/navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon, StarIcon } from "../Icons";
import InputBar from "./InputBar";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
    const a = false

    const pathname = usePathname();

    const feedSections = ['/feed', '/video', '/vibes', '/thoughts', '/images', '/explore', '/profile'];

    return (
        <>
            {/* Desktop View */}
            <div className="w-[100%] mt-[80px]">
                <div className="mb-[46px] mt-[20px]">
                    <img src="/images/home/profile-img.png" alt="profile-image" className="w-[42px] mx-auto rounded-full" />
                </div>

                <Link href="/gen-search">
                    <div className="mb-[34px]">
                        <div className="w-[29px] mx-auto">
                            <GenAiIcon w="30" h="30" className="mx-auto" fill={pathname === '/gen-ai-icon' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/gen-search' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] font-sans`}>Gen AI</p>
                    </div>
                </Link>

                <Link href="/task-bot">
                    <div className="mb-[34px]">
                        <div className="w-[29px] mx-auto">
                            <TaskBotIcon w="30" h="30" fill={pathname === '/task-bot' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/task-bot' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] font-sans`}>Task bot</p>
                    </div>
                </Link>

                <Link href="/feed">
                    <div className="mb-[34px]">
                        <div className="w-[29px] mx-auto">
                            <FeedIcon w="30" h="30" fill={feedSections.includes(`${pathname}`) ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${feedSections.includes(`${pathname}`) ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] font-sans`}>Feed</p>
                    </div>
                </Link>

                <Link href="/shop">
                    <div className="mb-[34px]">
                        <div className="w-[29px] mx-auto">
                            <ShopIcon w="30" h="30" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] font-sans`}>Shop</p>
                    </div>
                </Link>

                <Link href="/news">
                    <div className="mb-[34px]">
                        <div className="w-[29px] mx-auto">
                            <NewsIcon w="30" h="30" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                        <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] font-sans`}>News</p>
                    </div>
                </Link>
                {/* <Link> */}
                <div className="mb-[34px]">
                    <div className="w-[29px] mx-auto">
                        <StarIcon w="30" h="30" fill={pathname === '/star' ? "#1E71F2" : "#8E8E93"} />
                    </div>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}

export default Sidebar;