"use client";
import { UserProfileContext } from "@/context/UserProfileContext";
import { PlusIcon } from "../Icons";
import ProfilePicture from "../elements/ProfilePicture";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { setSessionStorage } from "@/utlils/utils";
import StoryModal from "../elements/StoryModal";
import SingleStoryModal from "../story/SingleStoryModal";
import UserStoryModal from "./UserStoryModal";
import CreateDropdown from "../elements/CreateDropdown";

const UserProfile = ({ userData }) => {
  const {
    setIsFollowerModalOpen,
    setIsFollowingModalOpen,
    setIsShareProfileModalOpen,
    postsCount,
    getStories,
    stories,
    isShareProfileModalOpen,
  } = useContext(UserProfileContext);
  const [isCreateStorySignleOpen, setIsCreateStorySignleOpen] = useState(false);

  useEffect(() => {
    getStories();
  }, []);

  console.log(stories);

  return (
    <div className="pt-8">
      <div className="lg:px-12">
        <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
          <button
            onClick={() => {
              setIsCreateStorySignleOpen(true);
            }}
            className={`min-w-[120px] w-[120px] h-[120px] rounded-full flex justify-center p-[2.5px] items-center relative ${
              !stories?.length
                ? "bg-gray-400"
                : "bg-[linear-gradient(180deg,#6237FF_30.5%,#258EFF_100%)] hover:bg-[linear-gradient(180deg,#6237FF_30.5%,#258EFF_100%)]/80"
            }`}
          >
            <div className="w-full h-full bg-white rounded-full flex justify-center items-center">
              <div className="w-[104px] h-[104px] rounded-full bg-white">
                <ProfilePicture
                  image={userData?.profile_picture}
                  alt="Profile Picture"
                  className="min-w-full min-h-full rounded-full"
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
              onClick={() => setIsFollowerModalOpen(true)}
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
              onClick={() => setIsFollowingModalOpen(true)}
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
          <Link
            href={"/profile/edit-profile"}
            className="bg-white text-brandprimary font-semibold text-lg py-2 px-4 flex-1 text-center rounded-full border border-brandprimary"
            onClick={() =>
              setSessionStorage("user-details", JSON.stringify(userData))
            }
          >
            Edit
          </Link>
          <button
            onClick={() => setIsShareProfileModalOpen(true)}
            className="bg-brandprimary flex-1 text-white text-lg font-semibold py-2 px-4 rounded-full"
          >
            Share profile
          </button>
          <CreateDropdown
            icon={
              <button className=" [&_path]:fill-white [&_svg]:w-2 [&_svg]:h-2 bg-[#ACACAC] rounded-full p-1 w-[18px] h-[18px] flex justify-center items-center">
                <PlusIcon w={8} h={8} fill={"#FFFFFF"} />
              </button>
            }
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
  //   <div className="relative ">
  //     <img
  //       src="/images/profile/Rectangle40138.png"
  //       alt="Cover"
  //       className="w-full h-55 object-cover"
  //     />
  //     <Link
  //       href={"/profile/edit-profile"}
  //       className="absolute top-16 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary"
  //       onClick={() =>
  //         setSessionStorage("user-details", JSON.stringify(userData))
  //       }
  //     >
  //       Edit
  //     </Link>
  //     <button
  //       onClick={() => setIsShareProfileModalOpen(true)}
  //       className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full"
  //     >
  //       Share profile
  //     </button>

  //     <div className="flex flex-col items-center border-2 -mt-16">
  //       <ProfilePicture size={104} image={userData?.profile_picture} />
  //       <h1 className="mt-4 text-3xl font-bold text-gray-900 flex items-center">
  //         {userData?.name}
  //         <span className="text-brandprimary text-xl ml-2">
  //           <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
  //         </span>
  //       </h1>

  //       <div className="text-center text-brandplaceholder mb-4">
  //         @{userData?.user_name}
  //       </div>

  //       <p className="text-brandprimary text-center mt-2 px-6 text-2xl">
  //         {userData?.bio}
  //       </p>

  //       <div className="flex justify-around w-full my-6">
  //         <div className="text-center">
  //           <div className="text-4xl font-bold">{postsCount}</div>
  //           <div className="font-bold text-brandprimary">Posts</div>
  //         </div>
  //         <div className="text-center">
  //           <div className="text-4xl font-bold">
  //             {userData?.counts?.followers.toLocaleString()
  //               ? userData?.counts?.followers.toLocaleString()
  //               : 0}
  //           </div>
  //           <button
  //             onClick={() => setIsFollowerModalOpen(true)}
  //             className="font-bold text-brandprimary"
  //           >
  //             Followers
  //           </button>
  //         </div>
  //         <div className="text-center">
  //           <div className="text-4xl font-bold">
  //             {userData?.counts?.followings.toLocaleString()
  //               ? userData?.counts?.followings.toLocaleString()
  //               : 0}
  //           </div>
  //           <button
  //             onClick={() => setIsFollowingModalOpen(true)}
  //             className="font-bold text-brandprimary"
  //           >
  //             Following
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default UserProfile;
