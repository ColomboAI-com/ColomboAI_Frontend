// /* eslint-disable @next/next/no-img-element */
// 'use client'

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import InputBar from "./InputBar";
// import { ChatBubbleIcon, CreateIcon, NotificationIcon, SearchIcon } from "../Icons";
// import FeedFilter from "./FeedFilter";
// import CreateDropdown from "../elements/CreateDropdown";
// import Modal from "../elements/Modal";
// import Post from "../elements/cards/Post";
// import { useContext } from "react";
// import { GlobalContext } from "@/context/GlobalContext";
// import Share from "../Share";
// import InputGenAiSearch from "../gen-ai/InputGenAiSearch";


// const Header = () => {

//     const { isShareOpen, setIsShareOpen } = useContext(GlobalContext);
//     const pathname = usePathname();

//     return (
//         <div className=" bg-white sticky top-14 z-40">
//             {/* Desktop view */}

//             {/* <div className=" hidden lg:flex items-center justify-between shadow-[0px_2px_4px_0px_#0000001A] lg:py-9">
//                 <ul className="flex items-center xl:gap-1 justify-evenly xl:w-[60%]">
//                     {navigation.map((nav, index) => (
//                         <li key={index} className="mx-4 lg:max-">
//                             <Link href={nav.link} className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" : "text-sidebaricon"}  hover:text-brandprimary font-sans`}>{nav.name}</Link>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="flex gap-4 lg:gap-8 mx-9 ">
//                     <SearchIcon w={35} h={35} fill={'#646464'} />
//                     <CreateIcon w={35} h={35} fill={'#646464'} />
//                     <NotificationIcon w={35} h={35} fill={'#646464'} />
//                     <ChatBubbleIcon w={35} h={35} fill={'#646464'} />
//                 </div>
//             </div> */}

//             {/* Tablet view */}

//             <div className="shadow-[0px_2px_4px_0px_#0000001A]">
//                 <div className=" hidden md:flex items-center justify-between">
//                     <div className="w-[100%] lg:w-[70%] px-5 lg:px-20 border-">
//                         {/* <InputBar/> */}
//                         {pathname === '/gen-ai' ? <InputGenAiSearch /> : <InputBar />}

//                     </div>
//                     <div className="flex gap-4 mr-9 justify-evenly w-[20%] ">
//                         <SearchIcon w={35} h={35} fill={'#646464'} />
//                         <CreateDropdown/>
//                         <NotificationIcon w={35} h={35} fill={'#646464'} />
//                         <ChatBubbleIcon w={35} h={35} fill={'#646464'} />
//                     </div>
//                 </div>
//             </div>

//             {/* mobile view */}

//             <div className="shadow-[0px_2px_4px_0px_#0000001A]">
//                 <div className=" block md:hidden">
//                     <div className="flex justify-between">
//                         <div className="flex items-center">
//                             <img src="/images/home/profile-img.png" alt="profile-image" className="w-[58px] mx-auto" />
//                             <SearchIcon w={35} h={35} fill={'#646464'} />
//                         </div>
//                         <div className="flex items-center gap-4 lg:gap-8 mx-9 ">
//                             <CreateDropdown/>
//                             <NotificationIcon w={35} h={35} fill={'#646464'} />
//                             <ChatBubbleIcon w={35} h={35} fill={'#646464'} />
//                         </div>
//                     </div>
//                     <div className="w-full">
//                         <InputBar/>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default Header;

'use client'

import React from 'react';
import { usePathname } from "next/navigation";
import { ChatBubbleIcon, CreateIcon, NotificationIcon, SearchIcon } from "../Icons";
import CreateDropdown from "../elements/CreateDropdown";
import InputBar from "./InputBar";
import InputGenAiSearch from "../gen-ai/InputGenAiSearch";

const Header = () => {
    const pathname = usePathname();

    const renderInput = () => {
        if (pathname === '/gen-ai') {
            return <InputGenAiSearch />;
        } else {
            return <InputBar />;
        }
    };

    const renderIcons = () => {
        if (pathname !== '/gen-ai') {
            return (
                <div className="flex gap-4 mr-9 justify-evenly w-[20%]">
                    <SearchIcon w={35} h={35} fill={'#646464'} />
                    <CreateDropdown/>
                    <NotificationIcon w={35} h={35} fill={'#646464'} />
                    <ChatBubbleIcon w={35} h={35} fill={'#646464'} />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white sticky top-14 z-40">
            <div className="shadow-[0px_2px_4px_0px_#0000001A]">
                <div className="hidden md:flex items-center justify-between">
                    <div className="w-[100%] lg:w-[70%] px-5 lg:px-20 border-">
                        {renderInput()}
                    </div>
                    {renderIcons()}
                </div>
            </div>

            {/* Mobile view */}
            <div className="shadow-[0px_2px_4px_0px_#0000001A] md:hidden">
                <div className="flex justify-between items-center p-4">
                    <img src="/images/home/profile-img.png" alt="profile-image" className="w-[40px]" />
                    {renderIcons()}
                </div>
                <div className="w-full px-4 pb-4">
                    {renderInput()}
                </div>
            </div>
        </div>
    );
}

export default Header;