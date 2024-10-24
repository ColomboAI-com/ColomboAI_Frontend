'use client'
import { UserProfileContext } from "@/context/UserProfileContext";
import { VerifiedIcon } from "../Icons";
import ProfilePicture from "../elements/ProfilePicture";
import { useContext } from "react";
import Link from "next/link";
import { setSessionStorage } from "@/utlils/utils";

const UserProfile = ({ userData }) => {

  const { setIsFollowerModalOpen, setIsFollowingModalOpen, setIsShareProfileModalOpen, postsCount } = useContext(UserProfileContext);
  
  return (
    <div className="relative ">
      <img
        src="/images/profile/Rectangle40138.png"
        alt="Cover"
        className="w-full h-55 object-cover"
      />
      <Link
        href={'/profile/edit-profile'}
        className="absolute top-16 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary"
        onClick={() => setSessionStorage('user-details', JSON.stringify(userData))}
      >
        Edit
      </Link>
      <button onClick={() => setIsShareProfileModalOpen(true)} className="absolute top-16 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
        Share profile
      </button>

      <div className="flex flex-col items-center border-2 -mt-16">
        <ProfilePicture size={104} image={userData?.profile_picture} />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 flex items-center">
          {userData?.name}
          <span className="text-brandprimary text-xl ml-2">
            <VerifiedIcon w={20} h={20} fill={"#1E71F2"} />
          </span>
        </h1>

        <div className="text-center text-brandplaceholder mb-4">
          @{userData?.user_name}
        </div>

        <p className="text-brandprimary text-center mt-2 px-6 text-2xl">
          {userData?.bio}
        </p>

        <div className="flex justify-around w-full my-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{postsCount}</div>
            <div className="font-bold text-brandprimary">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{userData?.counts?.followers.toLocaleString() ? userData?.counts?.followers.toLocaleString() : 0}</div>
            <button onClick={() => setIsFollowerModalOpen(true)} className="font-bold text-brandprimary">Followers</button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{userData?.counts?.followings.toLocaleString() ? userData?.counts?.followings.toLocaleString() : 0}</div>
            <button onClick={() => setIsFollowingModalOpen(true)} className="font-bold text-brandprimary">Following</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
