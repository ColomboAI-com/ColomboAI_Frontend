/* eslint-disable @next/next/no-img-element */
import {
  BlockIcon,
  CrossIcon,
  MuteIcon,
  ReportIcon,
  RestrictUserIcon,
  TrashIcon,
  UserProfileIcon,
  VerifiedIcon,
} from "../Icons";
import { BsThreeDots } from "react-icons/bs";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import Dropdown from "./Dropdown";

const UserProfileSection = ({ data }) => {
  const { isUserProfileOpen, setIsUserProfileOpen } = useContext(GlobalContext);

  return (
    <div
      className={`${
        isUserProfileOpen ? "block" : "hidden"
      } max-h-[calc(100dvh_-_240px)] md:max-h-[calc(100dvh_-_140px)] overflow-y-auto no-scrollbar mx-4 border- `}
    >
      <div className=" flex justify-between px-8 py-6">
        <div></div>
        <div className="  w-[70%] overflow-y-auto no-scrollbar py- px- ">
          <div
            className={`flex flex-col w-full items-center justify-between p-2`}
          >
            <div className="flex-1">
              <div className="flex flex-col items-center">
                <div className="relative flex-shrink-0 my-2">
                  <img
                    src={`/images/profile2/${data?.path}`}
                    className="h-[211px] w-[211px] rounded-full object-cover"
                    alt=""
                  />
                </div>
                <div className="mx- my-4 text-center">
                  <p className="font-extrabold text-3xl flex">{data?.name}</p>
                  <p className="truncate text-[16px] my-1 text-gray-500">
                    @{data?.name}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ul className=" flex my-1 min-w-[200px] px-4 rounded-lg p-0 py-2 text-gray-600  ">
                <li>
                  <button className="flex flex-col w-full items-center px-4 py-2 gap-5 hover:text-brandprimary">
                    <UserProfileIcon w={32} h={32} fill={"currentcolor"} />
                    Profile
                  </button>
                </li>
                <li>
                  <button className="flex flex-col w-full items-center px-4 py-2 gap-5 hover:text-brandprimary">
                    <MuteIcon w={32} h={32} fill={"currentcolor"} />
                    Mute
                  </button>
                </li>
                <li>
                  <button className="flex flex-col w-full items-center px-4 py-2 gap-5 hover:text-brandprimary">
                    <BlockIcon w={32} h={32} fill={"currentcolor"} />
                    Block
                  </button>
                </li>
                <li>
                  <div className="flex flex-col w-full items-center px-4 py-2 gap-5 text-gray-600 hover:text-brandprimary">
                    <Dropdown
                      offset={[35, -30]}
                      placement={"right"}
                      btnClassName=" flex flex-col text-gray-600 my-1  rounded-full !flex justify-center items-center hover:text-brandprimary"
                      button={
                        <>
                          <BsThreeDots className=" flex mt-1 mb-3 w-[32px] h-[32px] opacity-70 hover:text-brandprimar" />
                          More
                        </>
                      }
                    >
                      <ul className="my-1 min-w-[200px] px-2 rounded-lg bg-white p-0 py-2 text-red-500 shadow-[6px_6px_6px_6px_#0000001A] ">
                        <li>
                          <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:text-red-600">
                            <RestrictUserIcon
                              w={25}
                              h={25}
                              fill={"currentcolor"}
                            />
                            Restrict
                          </button>
                        </li>
                        <li>
                          <button className="flex w-full items-center px-4 py-2 gap-5 hover:text-red-600">
                            <ReportIcon w={25} h={25} fill={"currentcolor"} />
                            Report
                          </button>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button
          className=" flex items-start outline-none focus:ring-offset-0 focus:ring-0"
          onClick={() => setIsUserProfileOpen(false)}
        >
          <CrossIcon w={20} h={20} fill={"#646464"} />
        </button>
      </div>
      <p className=" text-lg">Shared Media</p>
      <div className="h-px w-full border-b border-white-light"></div>
      <div className=" grid grid-cols-4 h-auto my-4">
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
        <div className="border-2 border-gray-400">
          <img
            src={`/images/home/feed-banner-img.png`}
            className=" w-full h-full object-none"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
