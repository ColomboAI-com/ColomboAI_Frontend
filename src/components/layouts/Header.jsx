/* eslint-disable @next/next/no-img-element */
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    {name: "Feed", link: "/feed"},
    {name: "Video", link: "/video"},
    {name: "Vibes", link: "/vibes"},
    {name: "Thoughts", link: "/thoughts"},
    {name: "Images", link: "/images"},
    {name: "Explore", link: "/explore"},
    {name: "Profile", link: "/profile"},
]

const Header = () => {

    const pathname = usePathname();

    return (
        <div className="flex items-center justify-between shadow-[0px_2px_4px_0px_#0000001A] pt-9 pb-7">
        <ul className="flex items-center ml-[86px]">
            {navigation.map((nav, index) => (
                <li key={index} className="mr-[75px]">
                    <Link href={nav.link} className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" :"text-sidebaricon"}  hover:text-brandprimary font-sans`}>{nav.name}</Link>
                </li>
            ))}
        </ul>
        <div className="flex gap-12 items-center mx-9">
            <img src="/images/icons/navbar/Search.svg" alt="search-icon" className="w-[26px]"/>
            <img src="/images/icons/navbar/Create.svg" alt="create-icon" className="w-[26px]"/>
            <img src="/images/icons/navbar/Notification.svg" alt="notification-icon" className="w-[26px]"/>
            <img src="/images/icons/navbar/Chat_bubble.svg" alt="chat-icon" className="w-[26px]"/>
        </div>
        </div>
    );
}

export default Header;