"use client";
import Modal from "@/components/elements/Modal";
import Navigation from "@/components/profile/Navigation";
import VisitProfile from "@/components/profile/VisitProfile";
import ShareProfileModal from "@/components/profile/modals/ShareProfileModal";
import { UserProfileContext } from "@/context/UserProfileContext";
import { useContext, useEffect } from "react";

const UserName = ({ params }) => {
  const {
    getUserDetails,
    resetFeedValues,
    userDetails,
    loadings,
    isShareProfileModalOpen,
    setIsShareProfileModalOpen,
  } = useContext(UserProfileContext);

  useEffect(() => {
    getUserDetails(params?.username);
    return () => resetFeedValues();
  }, [params]);

  return (
    <div className=" max-w-5xl mx-auto font-sans">
      <VisitProfile userData={userDetails} />
      <Navigation username={params?.username} />
      {isShareProfileModalOpen && (
        <Modal
          isOpen={isShareProfileModalOpen}
          setIsOpen={setIsShareProfileModalOpen}
          className="w-full font-sans max-w-md md:max-w--lg lg:max-w--xl transform overflow-hidden rounded-[26px] bg-white text-left align-middle shadow-xl transition-all"
        >
          <ShareProfileModal userData={userDetails} />
        </Modal>
      )}
    </div>
  );
};

export default UserName;
