/* eslint-disable @next/next/no-img-element */
"use client";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { VerifiedIcon } from "../Icons";
import ProfilePicture from "../elements/ProfilePicture";
import Dropdown from "../messages/Dropdown";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";
import Image from "next/image";
import StoryModal from "../elements/StoryModal";
import UserStoryModal from "./UserStoryModal";
import axios from "axios";
import { ROOT_URL_AUTH, ROOT_URL_FEED } from "@/utlils/rootURL";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function ThreeDotMenu({ onReport, onRestrict, onBlock, isBlocked }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // outside click
    const handleOutsideClick = (event) => {
      if (!event.target.closest("#three-dot-menu")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isBlocked]);

  return (
    <div className="relative" id="three-dot-menu">
      <button onClick={toggleMenu}>
        <DotsVerticalIcon className="h-8 w-8 text-[#ACACAC]" />
      </button>
      {isMenuOpen && (
        <div className="absolute left-3 w-48 bg-white rounded-md z-10 shadow-[0px_4px_10px_2px_#00000033]">
          <div className="py-1">
            <button
              onClick={onRestrict}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-[#E95050] hover:bg-gray-100"
            >
              <img src="/images/home/restrict.svg" className="w-8 h-8" />
              Restrict
            </button>
            <div className="h-[0.2px] mx-4 bg-[#ACACAC] w-[calc(100%-32px)]" />
            <button
              onClick={onReport}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-[#E95050] hover:bg-gray-100"
            >
              <img src="/images/home/report.svg" className="w-8 h-8" />
              Report
            </button>
            <div className="h-[0.2px] mx-4 bg-[#ACACAC] w-[calc(100%-32px)]" />
            <button
              onClick={onBlock}
              className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-[#E95050] hover:bg-gray-100"
            >
              <img src="/images/home/block.svg" className="w-6 h-6 ml-1" />
              {isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const VisitProfile = ({ userData }) => {
  const {
    postsCount,
    blockUser,
    followUnfollowUser,
    handleFollower,
    followingsData,
    setIsShareProfileModalOpen,
  } = useContext(UserProfileContext);

  const user = getCookie("username");

  const [isCreateStorySignleOpen, setIsCreateStorySignleOpen] = useState(false);
  const [stories, setStories] = useState([]);

  let [isFollowing, setIsFollowing] = useState(false);
  let [isBlocked, setIsBlocked] = useState(false);

  const getStories = async () => {
    try {
      const res = await axios.get(
        `${ROOT_URL_FEED}/stories/users/${userData?._id}`,
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      console.log(res.data, "getStories");
      setStories(res.data);
    } catch (err) {
      console.log(err, "getStories");
      // handleError(err, "getStories");
    }
  };

  useEffect(() => {
    console.log(userData, "userData");
    if (userData?.is_following) {
      setIsFollowing(true);
    }
    if (userData?.blocked) {
      setIsBlocked(true);
    }
    getStories();
  }, [userData]);

  const toogleFollowing = () => {
    setIsFollowing(!isFollowing);
  };
  const toogleBlock = () => {
    setIsBlocked(!isBlocked);
  };

  console.log(userData, "userData", stories);

  return (
    <div className="pt-8">
      <div className="lg:px-12">
        <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
          <button
            onClick={() => setIsCreateStorySignleOpen(true)}
            className="min-w-[120px] w-[120px] h-[120px] rounded-full flex justify-center p-[2.5px] bg-[linear-gradient(180deg,#6237FF_30.5%,#258EFF_100%)] items-center relative"
          >
            <div className="w-full h-full bg-white rounded-full flex justify-center items-center">
              <div className="w-[104px] h-[104px] rounded-full bg-white">
                <ProfilePicture
                  image={userData?.profile_picture}
                  alt="Profile Picture"
                  className="min-w-full min-h-full !w-full !h-full rounded-full"
                />
              </div>
            </div>
          </button>

          <div className="flex lg:gap-6 gap-4 flex-1 justify-center">
            <div className="text-center">
              <div className="text-[21px] text-[#333333] font-bold">
                {postsCount}
              </div>
              <div className="text-[21px] font-medium text-[#333333]">
                Posts
              </div>
            </div>
            <button
              // onClick={() => setIsFollowerModalOpen(true)}
              className="text-center"
            >
              <div className="text-[21px] text-[#333333] font-bold">
                {userData?.counts?.followers.toLocaleString()
                  ? userData?.counts?.followers.toLocaleString()
                  : 0}
              </div>
              <div className="text-[21px] font-medium text-[#333333]">
                Followers
              </div>
            </button>
            <button
              // onClick={() => setIsFollowingModalOpen(true)}
              className="text-center"
            >
              <div className="text-[21px] text-[#333333] font-bold">
                {userData?.counts?.followings.toLocaleString()
                  ? userData?.counts?.followings.toLocaleString()
                  : 0}
              </div>
              <div className="text-[21px] font-medium text-[#333333]">
                Following
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="text-[21px] font-bold text-black flex items-center">
            @{userData?.user_name}
            {/* <span className="text-brandprimary text-xl ml-2">
              <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
            </span> */}
          </div>
          <div className="text-[21px] text-gray-600">{userData?.name}</div>

          <p className="text-gray-800 text-[18px]">{userData?.bio}</p>
          <div>
            <a
              href={userData?.website}
              className="text-brandprimary text-base font-bold"
            >
              {userData?.website}
            </a>
          </div>
        </div>
        <div className="mt-4 flex gap-2 items-center">
          <button
            className="bg-white text-brandprimary font-semibold text-lg py-2 px-4 flex-1 text-center rounded-full border border-brandprimary"
            onClick={() => {
              followUnfollowUser(userData?._id), toogleFollowing();
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
          <Link
            href="/messages"
            className="bg-brandprimary text-center flex-1 text-white text-lg font-semibold py-2 px-4 rounded-full"
          >
            Message
          </Link>
          <ThreeDotMenu
            onReport={() => {}}
            onRestrict={() => {}}
            onBlock={() => {
              blockUser(userData?._id);
              toogleBlock();
            }}
            isBlocked={isBlocked}
          />
        </div>
      </div>
      {/** TODO: Saved stories, enable it once api is ready */}
      {/* <div className="my-4 lg:ml-12 overflow-x-auto">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center gap-[2px]">
              <div className="w-[60px] h-[60px] border-[#C3C3C3] border rounded-full flex justify-center items-center">
                <div className="w-[55px] h-[55px] bg-gray-200 rounded-full">
                  <Image
                    src="/images/profile/defalut_user.svg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={55}
                    height={55}
                  />
                </div>
              </div>
              <div className="text-xs text-black tracking-[-0.41px]">
                Text {item}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {isCreateStorySignleOpen && (
        <StoryModal
          isOpen={isCreateStorySignleOpen}
          setIsOpen={setIsCreateStorySignleOpen}
          className="sm:w-[100%] xl:ml-[68px] lg:ml-[62px] md:ml-[34px] transform overflow-hidden text-left align-middle shadow-xl transition-all"
        >
          <UserStoryModal
            setIsCreateStorySignleOpen={setIsCreateStorySignleOpen}
            storyData={stories}
            data_user={userData}
            onClose={() => setIsCreateStorySignleOpen(false)}
          />
        </StoryModal>
      )}
    </div>
  );

  // return (
  //   <div className="relative">
  //     <img
  //       src="/images/profile/Rectangle40138.png"
  //       alt="Cover"
  //       className="w-full h-55 object-cover"
  //     />

  //     {
  //       userData?.user_name === user
  //         ?
  //         <>
  //           <Link href={'/profile/edit-profile'} className="absolute top-16 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary">
  //             Edit
  //           </Link>
  //           <button onClick={() => setIsShareProfileModalOpen(true)} className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
  //             Share profile
  //           </button>
  //         </>
  //         :
  //         <>
  //           {/* button of Condition for following */}
  //           <button onClick={() => { followUnfollowUser(userData?._id), toogleFollowing() }} className={`absolute top-16 left-4 -translate-y-1/2 ${isFollowing ? "bg-brandprimary text-white" : "bg-white text-brandprimary"} font-bold py-2 px-4 rounded-full border-2 border-brandprimary`}>
  //             {isFollowing ? "Following" : "Follow"}
  //           </button>
  //           <Link href='/messages' className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
  //             Message
  //           </Link>
  //         </>
  //     }

  //     <div className="flex flex-col items-center border-2 -mt-16">
  //       <ProfilePicture size={101} image={userData?.profile_picture} />

  //       <h1 className="mt-4 text-3xl font-bold text-gray-900 flex items-center">
  //         {userData?.name || 'User'}
  //         <span className="text-brandprimary text-xl ml-2">
  //           <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
  //         </span>
  //       </h1>

  //       <div className="text-center text-brandplaceholder mb-4">
  //         @{userData?.user_name || 'username'}
  //       </div>

  //       <p className="text-brandprimary text-center mt-2 px-6 text-2xl">
  //         {userData?.bio}
  //       </p>

  //       <div className="flex justify-between w-full mt-6">
  //         <div></div>
  //         <div className=" flex justify-evenly w-full my-6">
  //           <div className="text-center">
  //             <div className="text-4xl font-bold">{postsCount}</div>
  //             <div className="font-bold text-brandprimary">Posts</div>
  //           </div>
  //           <div className="text-center">
  //             <div className="text-4xl font-bold">{userData?.counts?.followers.toLocaleString() ? userData?.counts?.followers.toLocaleString() : 0}</div>
  //             <div className="font-bold text-brandprimary">Followers</div>
  //           </div>
  //           <div className="text-center">
  //             <div className="text-4xl font-bold">{userData?.counts?.followings.toLocaleString() ? userData?.counts?.followings.toLocaleString() : 0}</div>
  //             <div className="font-bold text-brandprimary">Following</div>
  //           </div>
  //         </div>
  //         {
  //           userData?.user_name !== user &&
  //           <div className="flex flex-col w-ful items-center px-4 py-2 gap-5 text-gray-600 hover:text-brandprimary">
  //             <Dropdown
  //               offset={[35, -30]}
  //               placement={"right"}
  //               btnClassName=" flex flex-col text-gray-600 my-1  rounded-full !flex justify-center items-center hover:text-brandprimary"
  //               button={
  //                 <BsThreeDotsVertical className=" flex mt-1 mb-3 w-[32px] h-[32px] opacity-70 hover:text-brandprimar" />
  //               }
  //             >
  //               <ul className="my-1 min-w-[200px] px-2 rounded-lg bg-white p-0 py-2 text-red-500 shadow-[6px_6px_6px_6px_#0000001A] ">
  //                 <li>
  //                   <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:text-red-600">
  //                     <RestrictUserIcon
  //                       w={25}
  //                       h={25}
  //                       fill={"currentcolor"}
  //                     />
  //                     Restrict
  //                   </button>
  //                 </li>
  //                 <li>
  //                   <button className="flex w-full items-center border-b-2 px-4 py-2 gap-5 hover:text-red-600">
  //                     <ReportIcon w={25} h={25} fill={"currentcolor"} />
  //                     Report
  //                   </button>
  //                 </li>
  //                 <li>
  //                   <button onClick={() => {blockUser(userData?._id), toogleBlock()}} className="flex w-full items-center px-4 py-2 gap-5 hover:text-red-600">
  //                     <BlockIcon w={25} h={25} fill={"currentcolor"} />
  //                     {isBlocked ? "Unblock" : "Block"}
  //                   </button>
  //                 </li>
  //               </ul>
  //             </Dropdown>
  //           </div>
  //         }
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default VisitProfile;
