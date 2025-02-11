"use client";
import Loader from "@/components/Loader";
import Modal from "@/components/elements/Modal";
import Navigation from "@/components/profile/Navigation";
import UserProfile from "@/components/profile/Profile";
import FollowersModal from "@/components/profile/modals/FollowersModal";
import FollowingModal from "@/components/profile/modals/FollowingModal";
import ShareProfileModal from "@/components/profile/modals/ShareProfileModal";
import UnfollowModal from "@/components/profile/modals/UnfollowModal";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";
import { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const Profile = () => {
  const {
    isFollowerModalOpen,
    setIsFollowerModalOpen,
    isFollowingModalOpen,
    setIsFollowingModalOpen,
    isShareProfileModalOpen,
    setIsShareProfileModalOpen,
    isUnFollowModalOpen,
    setIsUnFollowModalOpen,
    getUserDetails,
    getFollowers,
    resetFeedValues,
    userDetails,
    followersData,
    followingsData,
    loadings,
  } = useContext(UserProfileContext);

  const userName = getCookie("username");

  useEffect(() => {
    getUserDetails(userName);
    getFollowers("followers");
    getFollowers("followings");
    return () => resetFeedValues();
  }, [userName]);

  return (
    <>
      {loadings?.userDetails && !userDetails?.user_name ? (
        <Loader />
      ) : (
        <>
          {!isShareProfileModalOpen ? (
            <div className="xl:mx-auto max-w-5xl mx-auto font-sans sm:w-[375px] w-[700px] md:w-[700px] lg:w-[700px]">
              <UserProfile userData={userDetails} />
              <Navigation username={userName} />
              {isFollowerModalOpen && (
                <Modal
                  isOpen={isFollowerModalOpen}
                  setIsOpen={setIsFollowerModalOpen}
                  className="w-full font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
                >
                  <FollowersModal followersData={followersData} />
                </Modal>
              )}
              {isFollowingModalOpen && (
                <Modal
                  isOpen={isFollowingModalOpen}
                  setIsOpen={setIsFollowingModalOpen}
                  className="w-full z-40 font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
                >
                  <FollowingModal followingsData={followingsData} />
                  {isUnFollowModalOpen && (
                    <Modal
                      isOpen={isUnFollowModalOpen}
                      setIsOpen={setIsUnFollowModalOpen}
                      className="w-full z-50 font-sans max-w-md md:max-w--lg lg:max-w--xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
                    >
                      <UnfollowModal />
                    </Modal>
                  )}
                </Modal>
              )}
              {/* {isShareProfileModalOpen && (
            <Modal
              isOpen={isShareProfileModalOpen}
              setIsOpen={setIsShareProfileModalOpen}
              className="w-full font-sans max-w-md md:max-w--lg lg:max-w--xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
            >
              <ShareProfileModal userData={userDetails} />
            </Modal>
          )} */}
            </div>
          ) : (
            <div className="pt-16 relative bg-[linear-gradient(180deg,#1E71F2_0%,#8A2BE2_100%)]">
              <div className="max-w-[375px] mx-auto [&_.share-profile-modal]:!bg-transparent">
                <ShareProfileModal
                  userData={userDetails}
                  showCloseButton={false}
                />
              </div>
              <button
                onClick={() => setIsShareProfileModalOpen(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 border border-[#F2F2F2] bg-[#EEEEEE] rounded-full p-[5px]"
              >
                <MdOutlineClose className="text-gray-500 text-2xl" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
