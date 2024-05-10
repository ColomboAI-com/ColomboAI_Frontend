/* eslint-disable @next/next/no-img-element */
'use client'
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { BlockIcon, ReportIcon, RestrictUserIcon, VerifiedIcon } from "../Icons";
import ProfilePicture from "../elements/ProfilePicture";
import Dropdown from "../messages/Dropdown";
import Link from "next/link";
import { useContext } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";

const VisitProfile = ({ userData }) => {

  const { postsCount, blockUser, followUnfollowUser, handleFollower, followingsData, setIsShareProfileModalOpen } = useContext(UserProfileContext);

  const user = getCookie('username')

  return (
    <div className="relative">
      <img
        src="/images/profile/Rectangle40138.png"
        alt="Cover"
        className="w-full h-55 object-cover"
      />

      {
        userData?.user_name === user
          ?
          <>
            <Link href={'/profile/edit-profile'} className="absolute top-16 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary">
              Edit
            </Link>
            <button onClick={() => setIsShareProfileModalOpen(true)} className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
              Share profile
            </button>
          </>
          :
          <>
            <button onClick={() => { followUnfollowUser(userData?._id) }} className="absolute top-16 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary">
              Follow
            </button>
            <Link href='/messages' className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
              Message
            </Link>
          </>
      }

      <div className="flex flex-col items-center border-2 -mt-16">
        <ProfilePicture size={101} image={userData?.profile_picture} />

        <h1 className="mt-4 text-3xl font-bold text-gray-900 flex items-center">
          {userData?.name || 'User'}
          <span className="text-brandprimary text-xl ml-2">
            <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
          </span>
        </h1>

        <div className="text-center text-brandplaceholder mb-4">
          @{userData?.user_name || 'username'}
        </div>

        <p className="text-brandprimary text-center mt-2 px-6 text-2xl">
          {userData?.bio}
        </p>

        <div className="flex justify-between w-full mt-6">
          <div></div>
          <div className=" flex justify-evenly w-full my-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{postsCount}</div>
              <div className="font-bold text-brandprimary">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{userData?.counts?.followers.toLocaleString() ? userData?.counts?.followers.toLocaleString() : 0}</div>
              <div className="font-bold text-brandprimary">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{userData?.counts?.followings.toLocaleString() ? userData?.counts?.followings.toLocaleString() : 0}</div>
              <div className="font-bold text-brandprimary">Following</div>
            </div>
          </div>
          {
            userData?.user_name !== user &&
            <div className="flex flex-col w-ful items-center px-4 py-2 gap-5 text-gray-600 hover:text-brandprimary">
              <Dropdown
                offset={[35, -30]}
                placement={"right"}
                btnClassName=" flex flex-col text-gray-600 my-1  rounded-full !flex justify-center items-center hover:text-brandprimary"
                button={
                  <BsThreeDotsVertical className=" flex mt-1 mb-3 w-[32px] h-[32px] opacity-70 hover:text-brandprimar" />
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
                    <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:text-red-600">
                      <ReportIcon w={25} h={25} fill={"currentcolor"} />
                      Report
                    </button>
                  </li>
                  <li>
                    <button onClick={() => blockUser(userData?._id)} className="flex w-full items-center px-4 py-2 gap-5 hover:text-red-600">
                      <BlockIcon w={25} h={25} fill={"currentcolor"} />
                      Block
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default VisitProfile;
