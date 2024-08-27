/* eslint-disable @next/next/no-img-element */
import { GlobalContext } from "@/context/GlobalContext";
import { CrossIcon, VerifiedIcon } from "../Icons";
import { useContext } from "react";

const NewMessage = () => {

    const { isNewMessageOpen, setIsNewMessageOpen } = useContext(GlobalContext);

    const contactList = [
        {
            userId: 1,
            name: 'Nia Hillyer',
            path: 'profile-16.jpeg',
            active: true,
        },
        {
            userId: 2,
            name: 'Sean Freeman',
            path: 'profile-1.jpeg',
            active: false,
        },
        {
            userId: 3,
            name: 'Alma Clarke',
            path: 'profile-2.jpeg',
            active: true,
        },
        {
            userId: 4,
            name: 'Alan Green',
            path: 'profile-3.jpeg',
            active: true,
        },
        {
            userId: 5,
            name: 'Shaun Park',
            path: 'profile-4.jpeg',
            active: false,
        },
        {
            userId: 6,
            name: 'Roxanne',
            path: 'profile-5.jpeg',
            active: false,
        },
        {
            userId: 7,
            name: 'Ernest Reeves',
            path: 'profile-6.jpeg',
            active: true,
        },
        {
            userId: 8,
            name: 'Laurie Fox',
            path: 'profile-7.jpeg',
            active: true,
        },
        {
            userId: 9,
            name: 'Xavier',
            path: 'profile-8.jpeg',
            active: false,
        },
        {
            userId: 10,
            name: 'Susan Phillips',
            path: 'profile-9.jpeg',
            active: true,
        },
        {
            userId: 11,
            name: 'Dale Butler',
            path: 'profile-10.jpeg',
            active: false,
        },
        {
            userId: 12,
            name: 'Grace Roberts',
            path: 'user-profile.jpeg',
            active: true,
        },
    ];

    return (
        <div className=" max-h-[70vh]">
            <div className=" flex justify-between px-8 py-6 border-b-2">
                <div></div>
                <p className="text-2xl">
                    New Message
                </p>
                <button className="outline-none focus:ring-offset-0 focus:ring-0" onClick={() => setIsNewMessageOpen(false)}>
                    <CrossIcon w={20} h={20} fill={"#646464"} />
                </button>
            </div>
            <div className=" max-h-[60vh] border- overflow-y-auto no-scrollbar py-4 px-6 ">
            {contactList.map((person) => {
                return (
                    <div key={person.userId}>
                        <div className={`flex w-full items-center border-b- justify-between p-2 hover:bg-gray-100 hover:text-brandprimary`}>
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <div className="relative flex-shrink-0">
                                        <img src={`/images/profile2/${person.path}`} className="h-12 w-12 rounded-full object-cover" alt="" />
                                    </div>
                                    <div className="mx-3 text-left">
                                        <p className="font-semibold flex">
                                            @{person.name}
                                            {
                                                person.active && 
                                                <span className="mx-1">
                                                    <VerifiedIcon w={20} h={20} fill={"#1E71F2"}/>
                                                </span>
                                            }
                                        </p>
                                        <p className="max-w-[160px] truncate text-xs text-gray-500">{person.name}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="border-[1px] border-brandprimary text-brandprimary rounded-2xl px-6 py-1">
                                Message
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default NewMessage;