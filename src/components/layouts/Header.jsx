/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import InputBar from "./InputBar";

const navigation = [
    { name: "Feed", link: "/feed" },
    { name: "Video", link: "/feed/video" },
    { name: "Vibes", link: "/feed/vibes" },
    { name: "Thoughts", link: "/feed/thoughts" },
    { name: "Images", link: "/feed/images" },
    { name: "Explore", link: "/explore" },
    { name: "Profile", link: "/profile" },
];

const Header = () => {

    const pathname = usePathname();

    return (
        <div className=" bg-white sticky top-14 z-50">
            {/* Desktop view */}

            <div className=" hidden lg:flex items-center justify-between shadow-[0px_2px_4px_0px_#0000001A] lg:py-9">
                <ul className="flex items-center xl:gap-1 justify-evenly xl:w-[60%]">
                    {navigation.map((nav, index) => (
                        <li key={index} className="mx-4 lg:max-">
                            <Link href={nav.link} className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" : "text-sidebaricon"}  hover:text-brandprimary font-sans`}>{nav.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4 lg:gap-8 mx-9 ">
                    <img src="/images/icons/navbar/Search.svg" alt="search-icon" className="w-[26px]" />
                    <img src="/images/icons/navbar/Create.svg" alt="create-icon" className="w-[26px]" />
                    <img src="/images/icons/navbar/Notification.svg" alt="notification-icon" className="w-[26px]" />
                    <img src="/images/icons/navbar/Chat_bubble.svg" alt="chat-icon" className="w-[26px]" />
                </div>
            </div>

            {/* Tablet view */}

            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
                <div className=" hidden md:flex lg:hidden items-center justify-between">
                    <div className="w-[70%] mx-5">
                        <InputBar/>
                    </div>
                    <div className="flex gap-4 mr-9 ">
                        <img src="/images/icons/navbar/Search.svg" alt="search-icon" className="w-[26px]" />
                        <img src="/images/icons/navbar/Create.svg" alt="create-icon" className="w-[26px]" />
                        <img src="/images/icons/navbar/Notification.svg" alt="notification-icon" className="w-[26px]" />
                        <img src="/images/icons/navbar/Chat_bubble.svg" alt="chat-icon" className="w-[26px]" />
                    </div>
                </div>
                <ul className="hidden md:flex lg:hidden items-center gap-4 justify-evenly">
                    {navigation.map((nav, index) => (
                        <li key={index} className="mb-4">
                            <Link href={nav.link} className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" : "text-sidebaricon"}  hover:text-brandprimary font-sans`}>{nav.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>


            {/* mobile view */}

            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
                <div className=" block md:hidden">
                    <div className="flex justify-between">
                        <div className=" flex">
                            <img src="/images/home/profile-img.png" alt="profile-image" className="w-[58px] mx-auto" />
                            <img src="/images/icons/navbar/Search.svg" alt="search-icon" className="w-[26px]" />
                        </div>
                        <div className="flex gap-4 lg:gap-8 mx-9 ">
                            <img src="/images/icons/navbar/Create.svg" alt="create-icon" className="w-[26px]" />
                            <img src="/images/icons/navbar/Notification.svg" alt="notification-icon" className="w-[26px]" />
                            <img src="/images/icons/navbar/Chat_bubble.svg" alt="chat-icon" className="w-[26px]" />
                        </div>
                    </div>
                    <div className="w-full">
                        <InputBar/>
                    </div>
                </div>
                <div className=" flex flex-wrap md:hidden items-center justify-evenly">
                    {navigation.map((nav, index) => (
                        <span key={index} className="mx-4 mb-4">
                            <Link href={nav.link} className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" : "text-sidebaricon"}  hover:text-brandprimary font-sans`}>{nav.name}</Link>
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Header;