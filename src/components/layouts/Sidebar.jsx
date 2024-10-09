'use client'
import { usePathname, useRouter } from "next/navigation";
import { FeedIcon, GenAiIcon, NewsIcon, ShopIcon, TaskBotIcon, StarIcon } from "../Icons";
import { clearCookie, getCookie } from "@/utlils/cookies";
import Dropdown from '../messages/Dropdown';

import InputBar from "./InputBar";
import Link from "next/link";
import ProfilePicture from "../elements/ProfilePicture";
import { useEffect, useState } from "react";
import { Montserrat } from "@next/font/google";
import Image from "next/image";
import vibes_icon from "../../../public/images/icons/sidebar/vibes_icon.svg"
import blue_vibes_icon from "../../../public/images/icons/sidebar/blue_vibes_icon.svg"


const font = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
/* eslint-disable @next/next/no-img-element */
const Sidebar = () => {
    const a = false
    const [name, Setname] = useState();
    const [profilePic, SetprofilePic] = useState();

    const pathname = usePathname();
    const router = useRouter();

    const feedSections = ['/feed', '/video', '/vibes', '/thoughts', '/images', '/explore', '/profile'];

    useEffect(() => {
        Setname(getCookie('name'));
        SetprofilePic(getCookie('profilePic'));
    }, [])

    const handleSignOut = () => {
        clearCookie();
        router.push("/sign-up")
    };

    return (
        <>
            {/* Desktop View */}
            <div className={`xl:w-[100%]  lg:w-[3.5rem] xl:mt-[0px] lg:mt-[5rem] ${font.className}`}>
                <div className="lg:mb-[46px] md:mt-[6rem] md:mb-[46px] xl:mt-[6rem] lg:mt-[6rem] relative">

                    <Dropdown
                        offset={[0, 10]}
                        placement="bottom-start"
                        btnClassName="flex z-50 justify-center items-center rounded-full hover:text-brandprimary cursor-pointer mx-auto"
                        button={<ProfilePicture image={profilePic} />}
                    >
                        <ul className="min-w-[160px] rounded-lg bg-white shadow-md">
                            <Link href="/profile"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer  text-brandprimary">{name}</li></Link>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer " onClick={handleSignOut}>Log out</li>
                        </ul>
                    </Dropdown>
                </div>
                {/* <div className="mb-[46px] mt-[20px]">
                    <img src={getCookie('profilePic')} alt="profile-image" className="w-[42px] mx-auto rounded-full" />
                </div> */}
                <div className="h-[75vh] overflow-auto flex flex-col items-center">
                    <Link href="https://colomboai.com/genai-search/">
                        <div className="mb-[34px] flex flex-col items-center">
                            <GenAiIcon w="24" h="24" className="mx-auto" fill={pathname === '/gen-ai-icon' ? "#1E71F2" : "#8E8E93"} />
                            <p className={`${pathname === '/genai-search' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[10px] mt-[5px] `}>Gen AI</p>
                        </div>
                    </Link>
                    <Link href="/vibes">
                        <div className="mb-[34px] flex flex-col items-center">
                            {pathname === '/vibes' ? <Image src={blue_vibes_icon} alt="colombo"/> : <Image src={vibes_icon} alt="colombo"/>}
                            <p className={`${pathname === '/vibes' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[10px] mt-[5px] `}>Vibes</p>
                        </div>
                    </Link>

                    <Link href="/feed">
                        <div className="mb-[34px] flex flex-col items-center">
                            <FeedIcon w="24" h="24" fill={feedSections.includes(`${pathname}`) ? "#1E71F2" : "#8E8E93"} />
                            <p className={`${feedSections.includes(`${pathname}`) ? "text-brandprimary" : "text-sidebaricon"} text-center text-[10px] mt-[5px] `}>Feed</p>
                        </div>
                    </Link>

                    <Link href="/shop">
                        <div className="mb-[34px] flex flex-col items-center">
                            <ShopIcon w="24" h="24" fill={pathname === '/shop' ? "#1E71F2" : "#8E8E93"} />
                            <p className={`${pathname === '/shop' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[10px] mt-[5px] `}>Shop</p>
                        </div>
                    </Link>

                    <Link href="/news">
                        <div className="mb-[34px] flex flex-col items-center">
                            <NewsIcon w="24" h="24" fill={pathname === '/news' ? "#1E71F2" : "#8E8E93"} />
                            <p className={`${pathname === '/news' ? "text-brandprimary" : "text-sidebaricon"} text-center text-[10px] mt-[5px] `}>News</p>
                        </div>
                    </Link>
                    {/* <Link> */}
                    <div className="mb-[34px] flex flex-col items-center">
                        <StarIcon w="24" h="24" fill={pathname === '/star' ? "#1E71F2" : "#8E8E93"} />
                    </div>
                    {/* </Link> */}
                </div>
            </div>
        </>
    );
}

export default Sidebar;