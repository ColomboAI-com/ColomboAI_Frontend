'use client'
import { usePathname, useRouter } from "next/navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon, StarIcon, VibesIcon } from "../Icons";
import { clearCookie, getCookie } from "@/utlils/cookies";
import Dropdown from '../messages/Dropdown';

import InputBar from "./InputBar";
import Link from "next/link";
import ProfilePicture from "../elements/ProfilePicture";
import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from '@next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
    const a = false
    const [name, Setname] = useState();
    const [profilePic, SetprofilePic] = useState();

    const pathname = usePathname();
    const router = useRouter();

    const feedSections = ['/feed', '/video', '/thoughts', '/images', '/explore', '/profile'];

    useEffect(() => {
        Setname(getCookie('name'));
        SetprofilePic(getCookie('profilePic'));
    },[])

    const handleSignOut = () => {
        clearCookie();
        router.push("/sign-up")
    };

    return (
        <main className={plusJakartaSans.className}>
            {/* Desktop View */}
            <div className="w-[100%] mt-[80px]">
                <div className="mb-[46px] mt-[20px] relative">

                    <Dropdown
                        offset={[0, 10]}
                        placement="bottom-start"
                        btnClassName="flex z-50 justify-center items-center rounded-full hover:text-brandprimary cursor-pointer mx-auto"
                        button={<ProfilePicture image={profilePic} />}
                    >
                        <ul className="min-w-[160px] rounded-lg bg-white shadow-md">
                            <Link href="/profile"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-brandprimary">{name}</li></Link>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={handleSignOut}>Log out</li>
                        </ul>
                    </Dropdown>
                </div>
                {/* <div className="mb-[46px] mt-[20px]">
                    <img src={getCookie('profilePic')} alt="profile-image" className="w-[42px] mx-auto rounded-full" />
                </div> */}
                <div className="h-[75vh] overflow-auto">
                    <Link href="/gen-search">
                        <div className="mb-[34px]">
                            <div className="w-[29px] mx-auto">
                                <GenAiIcon w="30" h="30" className="mx-auto" fill={pathname === '/gen-ai-icon' ? "#1E71F2" : "#8E8E93"} />
                            </div>
                            <p className={`${pathname === '/gen-search' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] `}>Gen AI</p>
                        </div>
                    </Link>

                    <Link href="/vibes">
                        <div className="mb-[34px]">
                            <div className="w-[35px] mx-auto">
                                <VibesIcon w="36" h="36" fill={pathname === '/vibes' ? "#1E71F2" : "#8E8E93"} />
                            </div>
                            <p className={`${pathname === '/vibes' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] `}>Vibes</p>
                        </div>
                    </Link>

                    <Link href="/feed">
                        <div className="mb-[34px]">
                            <div className="w-[29px] mx-auto">
                                <FeedIcon w="30" h="30" fill={feedSections.includes(`${pathname}`) ? "#1E71F2" : "#8E8E93"} />
                            </div>
                            <p className={`${feedSections.includes(`${pathname}`) ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] `}>Feed</p>
                        </div>
                    </Link>

                    <Link href="/shop">
                        <div className="mb-[34px]">
                            <div className="w-[35px] mx-auto">
                                <ShopIcon w="36" h="36" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                            </div>
                            <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] `}>Shop</p>
                        </div>
                    </Link>

                    <Link href="/news">
                        <div className="mb-[34px]">
                            <div className="w-[29px] mx-auto">
                                <NewsIcon w="30" h="30" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                            </div>
                            <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[14px] mt-[7px] `}>News</p>
                        </div>
                    </Link>
                    {/* <Link> */}
                    <div className="mb-[34px]">
                        <div className="w-[40px] mx-auto">
                            <StarIcon w="40" h="40" fill={pathname === '/star' ? "#1E71F2" : "#8E8E93"} />
                        </div>
                    </div>
                    {/* </Link> */}
                </div>
            </div>
        </main>
    );
}

export default Sidebar;