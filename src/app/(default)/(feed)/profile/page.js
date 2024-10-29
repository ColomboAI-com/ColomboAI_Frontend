'use client'
import Loader from "@/components/Loader";
import Modal from "@/components/elements/Modal";
import Navigation from "@/components/profile/Navigation";
import UserProfile from "@/components/profile/Profile";
import FollowersModal from "@/components/profile/modals/FollowersModal";
import FollowingModal from "@/components/profile/modals/FollowingModal";
import ShareProfileModal from "@/components/profile/modals/ShareProfileModal";
import UnfollowModal from "@/components/profile/modals/UnfollowModal";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies"
import { useContext, useEffect } from "react";

const Profile = () => {
    const { isFollowerModalOpen, setIsFollowerModalOpen, isFollowingModalOpen, setIsFollowingModalOpen, isShareProfileModalOpen, setIsShareProfileModalOpen, isUnFollowModalOpen, setIsUnFollowModalOpen, getUserDetails, getFollowers, resetFeedValues, userDetails, followersData, followingsData, loadings } = useContext(UserProfileContext);

    const userName = getCookie('username')
        
    useEffect(() => {
      getUserDetails(userName);
      getFollowers('followers');
      getFollowers('followings');
      return () => resetFeedValues()
    }, [userName]);

    return (
      <>
      {
        loadings?.userDetails && !userDetails?.user_name
        ?
        <Loader/>
        :
        <div className=" max-w-5xl mx-auto font-sans sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
            <UserProfile userData={userDetails}/>
            <Navigation username={userName}  />
            {
                isFollowerModalOpen &&
                <Modal isOpen={isFollowerModalOpen} setIsOpen={setIsFollowerModalOpen} className="w-full font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all">
                  <FollowersModal followersData={followersData}/>
                </Modal>
              }
              {
                isFollowingModalOpen &&
                <Modal isOpen={isFollowingModalOpen} setIsOpen={setIsFollowingModalOpen} className="w-full z-40 font-sans max-w-md md:max-w-lg lg:max-w-xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all">
                  <FollowingModal followingsData={followingsData}/>
                  {
                    isUnFollowModalOpen &&
                    <Modal isOpen={isUnFollowModalOpen} setIsOpen={setIsUnFollowModalOpen} className="w-full z-50 font-sans max-w-md md:max-w--lg lg:max-w--xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all">
                      <UnfollowModal/>
                    </Modal>
                  }
                </Modal>
              }
              {
                isShareProfileModalOpen &&
                <Modal isOpen={isShareProfileModalOpen} setIsOpen={setIsShareProfileModalOpen} className="w-full font-sans max-w-md md:max-w--lg lg:max-w--xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all">
                  <ShareProfileModal userData={userDetails}/>
                </Modal>
              }
        </div>
      }
      </>
    );
}

export default Profile;