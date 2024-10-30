/* eslint-disable @next/next/no-img-element */
'use client'
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import { CrossIcon, VerifiedIcon } from "@/components/Icons";
import Link from "next/link";

const FollowingModal = ({followingsData}) => {

    const { setIsFollowingModalOpen, setIsUnFollowModalOpen, setUnFollowModalData } = useContext(UserProfileContext);
    const [searchUser, setSearchUser] = useState('');
    const [filteredItems, setFilteredItems] = useState(followingsData);

    useEffect(() => {
        setFilteredItems(() => {
            return followingsData?.filter((d) => {
                return d.name.toLowerCase().includes(searchUser.toLowerCase());
            });
        });
    }, [searchUser]);

    return (
        <div className=" max-h-[80vh]">
            <div className=" flex justify-between px-8 py-6 border-b-2">
                <div></div>
                <p className="text-2xl">
                    Following
                </p>
                <button className="outline-none focus:ring-offset-0 focus:ring-0" onClick={() => setIsFollowingModalOpen(false)}>
                    <CrossIcon w={20} h={20} fill={"#646464"} />
                </button>
            </div>
            <div className="relative flex items-center w-[90%] mx-auto py-4">
                <svg className="absolute ml-4 fill-brandprimary" width="24" height="24" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2878 3.6665C11.5559 3.6665 3.66669 11.3815 3.66669 20.8985C3.66669 30.4154 11.5559 38.1305 21.2878 38.1305C25.4501 38.1305 29.2754 36.7192 32.2905 34.3593L38.0179 39.9457L38.1703 40.074C38.7021 40.4588 39.456 40.415 39.9371 39.9432C40.4664 39.4243 40.4653 38.584 39.9346 38.0665L34.2745 32.5457C37.1524 29.4787 38.909 25.3892 38.909 20.8985C38.909 11.3815 31.0197 3.6665 21.2878 3.6665ZM21.2878 6.32069C29.5208 6.32069 36.1949 12.8474 36.1949 20.8985C36.1949 28.9496 29.5208 35.4763 21.2878 35.4763C13.0549 35.4763 6.38081 28.9496 6.38081 20.8985C6.38081 12.8474 13.0549 6.32069 21.2878 6.32069Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search Profile"
                    aria-label="Search Profile"
                    className="pl-12 pr-4 py-2 w-full border-[1px] border-brandprimary rounded-[50px] placeholder:text-[#ACACAC] text-[20px] tracking-[2px] font-sans focus:outline-none"
                    value={searchUser} 
                    onChange={(e) => setSearchUser(e.target.value)}
                />
            </div>
            <div className=" max-h-[60vh] border- overflow-y-auto no-scrollbar py-4 px-6 ">
            {filteredItems?.map((person) => {
                return (
                    <div key={person._id}>
                        <div className={`flex w-full items-center border-b- justify-between p-2 sm:px-0 md:px-2 hover:bg-gray-100 hover:text-brandprimary`}>
                            <div className="flex-1">
                                <Link className="flex items-center w-fit" href={`/profile/${person?.user_name || ''}`}>
                                    <div className="relative flex-shrink-0">
                                        <img src={`${person.profile_picture}`} className="h-12 w-12 sm:h-10 sm:w-10 rounded-full object-cover" alt="profile_image" />
                                    </div>
                                    <div className="mx-2 text-left">
                                        <p className="font-semibold flex max-w-[160px] sm:text-[12px] md:text-[15px] truncate">
                                            @{person.user_name}
                                            {
                                                person.active && 
                                                <span className="mx-1">
                                                    <VerifiedIcon w={20} h={20} fill={"#1E71F2"}/>
                                                </span>
                                            }
                                        </p>
                                        <p className="max-w-[160px] truncate text-xs text-gray-500">{person.name}</p>
                                    </div>
                                </Link>
                            </div>
                            <button onClick={() => {
                                setIsUnFollowModalOpen(true)
                                setUnFollowModalData(person)
                                }} className="border-[1px] bg-brandprimary text-white rounded-2xl px-6 py-1 md:px-6 sm:px-2">
                                Following
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default FollowingModal;